package com.kunkunyu.post.flow.endpoint;

import com.kunkunyu.post.flow.FollowQuery;
import com.kunkunyu.post.flow.extension.Follow;
import com.kunkunyu.post.flow.service.FollowService;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.fn.builders.schema.Builder;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import org.springframework.web.server.ServerWebInputException;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;
import run.halo.app.extension.ListResult;
import run.halo.app.extension.Metadata;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;
import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.content.Builder.contentBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static org.springdoc.core.fn.builders.requestbody.Builder.requestBodyBuilder;

@Slf4j
@Component
@RequiredArgsConstructor
public class FollowEndpoint implements CustomEndpoint {

    private final FollowService followService;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        final var tag = "api.flow.post.kunkunyu.com/v1alpha1/Follow";
        var namePathParam = parameterBuilder().name("name")
            .in(ParameterIn.PATH)
            .required(true)
            .implementation(String.class);
        return SpringdocRouteBuilder.route()
            .GET("follows", this::listFollow, builder -> {
                    builder.operationId("ListFollows")
                        .tag(tag)
                        .description("分页查询订阅列表")
                        .response(
                            responseBuilder()
                                .implementation(ListResult.generateGenericClass(Follow.class))
                        );
                    FollowQuery.buildParameters(builder);
                }
            )
            .POST("follows/-/submit", this::submitFollow,
                builder -> builder.operationId("SubmitFollow")
                    .tag(tag)
                    .description("提交订阅")
                    .requestBody(requestBodyBuilder()
                        .required(true)
                        .content(contentBuilder()
                            .mediaType(MediaType.APPLICATION_JSON_VALUE)
                            .schema(Builder.schemaBuilder()
                                .implementation(SubmitFollowRequest.class))
                        ))
                    .response(responseBuilder()
                        .implementation(Void.class))
            )
            .GET("follows/{name}/confirm", this::confirmFollow,
                builder -> builder.operationId("ConfirmFollow")
                    .tag(tag)
                    .description("订阅")
                    .parameter(namePathParam)
                    .parameter(parameterBuilder()
                        .in(ParameterIn.QUERY)
                        .name("token")
                        .description("token")
                        .required(true)
                    )
                    .response(responseBuilder()
                        .implementation(String.class))
            )
            .GET("follows/{name}/cancel", this::cancelFollow,
                builder -> builder.operationId("CancelFollow")
                    .tag(tag)
                    .description("取消订阅")
                    .parameter(namePathParam)
                    .parameter(parameterBuilder()
                        .in(ParameterIn.QUERY)
                        .name("token")
                        .description("token")
                        .required(true)
                    )
                    .response(responseBuilder()
                        .implementation(String.class))
            )
            .build();
    }

    Mono<ServerResponse> listFollow(ServerRequest serverRequest) {
        FollowQuery followQuery = new FollowQuery(serverRequest);
        return followService.listFollow(followQuery)
            .flatMap(follows -> ServerResponse.ok().bodyValue(follows));
    }

    private Mono<ServerResponse> submitFollow(ServerRequest request) {
        return request.bodyToMono(SubmitFollowRequest.class)
            .doOnNext(submitFollowRequest -> {
                String email = submitFollowRequest.email();
                if (StringUtils.isBlank(email)) {
                    throw new ServerWebInputException("Email is required");
                }else {
                    if (!isValidEmail(email)) {
                        throw new ServerWebInputException("Mailbox format error");
                    }
                }
            })
            .flatMap(followRequest -> {
                Follow follow = SubmitFollowRequest.from(followRequest);
                return followService.submitFollow(follow);
            })
            .then(ServerResponse.ok().build());
    }

    private Mono<ServerResponse> confirmFollow(ServerRequest request) {
        var name = request.pathVariable("name");
        var token = request.queryParam("token").orElse("");
        return followService.confirmFollow(name,token)
            .then(Mono.defer(() -> ServerResponse.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .bodyValue("Subscribe successfully."))
            );
    }

    private Mono<ServerResponse> cancelFollow(ServerRequest request) {
        var name = request.pathVariable("name");
        var token = request.queryParam("token").orElse("");
        return followService.cancelFollow(name,token)
            .then(Mono.defer(() -> ServerResponse.ok()
                .contentType(MediaType.TEXT_PLAIN)
                .bodyValue("Unsubscribe successfully."))
            );
    }

    /**
     * 校验是否是正确的邮箱格式
     *
     * @param email:
     * @return: boolean
     **/
    public boolean isValidEmail(String email) {
        return email.matches("^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$");
    }

    record SubmitFollowRequest(@Schema(requiredMode = REQUIRED) String email) {


        public static Follow from(SubmitFollowRequest followRequest) {
            var follow = new Follow();
            follow.setMetadata(new Metadata());
            follow.getMetadata().setGenerateName("follow-");
            follow.setStatus(Follow.FollowStatus.pending);
            follow.setEmail(followRequest.email());
            follow.setToken(follow.generateToken());
            return follow;
        }
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.flow.post.kunkunyu.com/v1alpha1");
    }

}
