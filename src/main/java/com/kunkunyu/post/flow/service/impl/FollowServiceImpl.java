package com.kunkunyu.post.flow.service.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.kunkunyu.post.flow.FollowQuery;
import com.kunkunyu.post.flow.extension.Follow;
import com.kunkunyu.post.flow.service.FollowService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.experimental.UtilityClass;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.server.ServerWebInputException;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.notification.Reason;
import run.halo.app.core.extension.notification.Subscription;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.PageRequestImpl;
import run.halo.app.extension.ReactiveExtensionClient;
import run.halo.app.extension.router.selector.FieldSelector;
import run.halo.app.infra.ExternalUrlSupplier;
import run.halo.app.infra.utils.JsonUtils;
import run.halo.app.notification.NotificationCenter;
import run.halo.app.notification.NotificationReasonEmitter;
import run.halo.app.notification.UserIdentity;

import java.net.URI;
import java.util.Map;

import static com.kunkunyu.post.flow.NotificationReasonConst.CANCEL_FOLLOW;
import static com.kunkunyu.post.flow.NotificationReasonConst.SUBMIT_FOLLOW;
import static com.kunkunyu.post.flow.NotificationReasonConst.SUBSCRIBE_TO_NEW_POST;
import static org.apache.commons.lang3.ObjectUtils.defaultIfNull;
import static run.halo.app.extension.index.query.QueryFactory.and;
import static run.halo.app.extension.index.query.QueryFactory.equal;
import static run.halo.app.extension.index.query.QueryFactory.isNull;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final ReactiveExtensionClient client;

    private final NotificationReasonEmitter notificationReasonEmitter;

    private final NotificationCenter notificationCenter;

    private final ExternalUrlSupplier externalUrlSupplier;

    public static final String CONFIRM_SUBSCRIPTION =
        "/apis/api.flow.post.kunkunyu.com/v1alpha1/follows/{name}/confirm";


    @Override
    public Mono<ListResult<Follow>> listFollow(FollowQuery query) {
        return client.listBy(Follow.class, query.toListOptions(),
            PageRequestImpl.of(query.getPage(), query.getSize(), query.getSort()));
    }

    @Override
    public Mono<Void> submitFollow(Follow follow) {
        Assert.notNull(follow, "Follow must not be null");
        var listOptions = new ListOptions();
        listOptions.setFieldSelector(FieldSelector.of(
            and(equal("email", follow.getEmail()),
                isNull("metadata.deletionTimestamp"))
        ));

        return client.listAll(Follow.class,listOptions, Sort.unsorted())
            .hasElements()
            .flatMap(isExist -> {
                if (isExist) {
                    return Mono.error(() -> new ServerWebInputException("请勿重复添加订阅，已订阅。"));
                }else {
                    return client.create(follow).flatMap(follow1 -> sendSubmitFollowNotification(follow1));
                }
            });
    }


    @Override
    public Mono<Void> confirmFollow(String name,String token) {
        return client.fetch(Follow.class, name)
            .filter(follow -> StringUtils.equals(token, follow.getToken()))
            .switchIfEmpty(
                Mono.error(() -> new ServerWebInputException("没有订阅内容"))
            )
            .flatMap(follow -> {
                if (follow.getStatus().equals(Follow.FollowStatus.confirm)) {
                    return Mono.error(() -> new ServerWebInputException("订阅已确认，请不要重复确认"));
                }
                follow.setStatus(Follow.FollowStatus.confirm);
                return client.update(follow).then(subscribeNotification(follow.getEmail()));
            });
    }

    @Override
    public Mono<Void> cancelFollow(String name,String token) {
        return client.fetch(Follow.class, name)
            .filter(follow -> StringUtils.equals(token, follow.getToken()))
            .switchIfEmpty(
                Mono.error(() -> new ServerWebInputException("没有订阅内容"))
            )
            .flatMap(follow -> {
                if (follow.getStatus().equals(Follow.FollowStatus.cancel)) {
                    return Mono.error(() -> new ServerWebInputException("订阅已取消，请不要重复取消"));
                }
                follow.setStatus(Follow.FollowStatus.cancel);
                return client.update(follow)
                    .flatMap(follow1 -> unSubscribeNotification(follow1.getEmail()).then(sendCancelFollowNotification(follow1)));
            });
    }

    @Override
    public Mono<Void> subscribeNotification(String email) {
        var interestReason = new Subscription.InterestReason();
        interestReason.setReasonType(SUBSCRIBE_TO_NEW_POST);
        interestReason.setExpression("props.email == '%s'".formatted(email));
        var subscriber = new Subscription.Subscriber();
        subscriber.setName(UserIdentity.anonymousWithEmail(email).name());
        return notificationCenter.subscribe(subscriber, interestReason).then();
    }

    @Override
    public Mono<Void> unSubscribeNotification(String email) {
        var interestReason = new Subscription.InterestReason();
        interestReason.setReasonType(SUBSCRIBE_TO_NEW_POST);
        interestReason.setExpression("props.email == '%s'".formatted(email));
        var subscriber = new Subscription.Subscriber();
        subscriber.setName(UserIdentity.anonymousWithEmail(email).name());
        return notificationCenter.unsubscribe(subscriber, interestReason).then();
    }

    private Mono<Void> sendSubmitFollowNotification(Follow follow) {
        String email = follow.getEmail();
        String confirmUrl = getConfirmsubscribeUrl(follow);
        var reasonSubject = Reason.Subject.builder()
            .apiVersion(follow.getApiVersion())
            .kind(follow.getKind())
            .name(follow.getMetadata().getName())
            .title("提交订阅")
            .build();

        var emitReasonMono = notificationReasonEmitter.emit(SUBMIT_FOLLOW,
            builder -> {
                var attributes = ReasonData.builder()
                    .confirmUrl(confirmUrl)
                    .email(email)
                    .build();
                builder.attributes(ReasonDataConverter.toAttributeMap(attributes))
                    .author(UserIdentity.anonymousWithEmail(follow.getEmail()))
                    .subject(reasonSubject);
            });

        return autoSubscribeSubmitFollowEmailNotification(email).then(emitReasonMono);
    }

    Mono<Void> autoSubscribeSubmitFollowEmailNotification(String email) {
        var interestReason = new Subscription.InterestReason();
        interestReason.setReasonType(SUBMIT_FOLLOW);
        interestReason.setExpression("props.email == '%s'".formatted(email));
        var subscriber = new Subscription.Subscriber();
        subscriber.setName(UserIdentity.anonymousWithEmail(email).name());
        return notificationCenter.subscribe(subscriber, interestReason).then();
    }

    private Mono<Void> sendCancelFollowNotification(Follow follow) {
        String email = follow.getEmail();
        String confirmUrl = getConfirmsubscribeUrl(follow);
        var reasonSubject = Reason.Subject.builder()
            .apiVersion(follow.getApiVersion())
            .kind(follow.getKind())
            .name(follow.getMetadata().getName())
            .title("取消订阅")
            .build();

        var emitReasonMono = notificationReasonEmitter.emit(CANCEL_FOLLOW,
            builder -> {
                var attributes = ReasonData.builder()
                    .confirmUrl(confirmUrl)
                    .email(email)
                    .build();
                builder.attributes(ReasonDataConverter.toAttributeMap(attributes))
                    .author(UserIdentity.anonymousWithEmail(follow.getEmail()))
                    .subject(reasonSubject);
            });

        return autoSubscribeCancelFollowEmailNotification(email).then(emitReasonMono);
    }

    Mono<Void> autoSubscribeCancelFollowEmailNotification(String email) {
        var interestReason = new Subscription.InterestReason();
        interestReason.setReasonType(CANCEL_FOLLOW);
        interestReason.setExpression("props.email == '%s'".formatted(email));
        var subscriber = new Subscription.Subscriber();
        subscriber.setName(UserIdentity.anonymousWithEmail(email).name());
        return notificationCenter.subscribe(subscriber, interestReason)
            .then();
    }

    public String getConfirmsubscribeUrl(Follow follow) {
        var name = follow.getMetadata().getName();
        var token = follow.getToken();
        var externalUrl = defaultIfNull(externalUrlSupplier.getRaw(), URI.create("/"));
        return UriComponentsBuilder.fromUriString(externalUrl.toString())
            .path(CONFIRM_SUBSCRIPTION)
            .queryParam("token", token)
            .build(name)
            .toString();
    }

    @Builder
    record ReasonData(String confirmUrl,String email) {
    }

    @UtilityClass
    static class ReasonDataConverter {
        public static <T> Map<String, Object> toAttributeMap(T data) {
            Assert.notNull(data, "Reason attributes must not be null");
            return JsonUtils.mapper().convertValue(data, new TypeReference<>() {
            });
        }
    }


}
