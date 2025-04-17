package com.kunkunyu.post.flow;

import com.kunkunyu.post.flow.extension.Follow;
import com.kunkunyu.post.flow.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import run.halo.app.extension.ExtensionClient;
import run.halo.app.extension.ExtensionUtil;
import run.halo.app.extension.controller.Controller;
import run.halo.app.extension.controller.ControllerBuilder;
import run.halo.app.extension.controller.Reconciler;

@Slf4j
@Component
@RequiredArgsConstructor
public class FollowReconciler implements Reconciler<Reconciler.Request> {

    private final ExtensionClient client;

    private final FollowService followService;

    @Override
    public Result reconcile(Request request) {
        client.fetch(Follow.class, request.name())
            .ifPresent(follow -> {
                String email = follow.getEmail();
                if (ExtensionUtil.isDeleted(follow)) {
                    followService.unSubscribeNotification(email).block();
                    return;
                }
                if (follow.getStatus().equals(Follow.FollowStatus.confirm)) {
                    followService.subscribeNotification(email).block();
                }
                if (follow.getStatus().equals(Follow.FollowStatus.cancel)) {
                    followService.unSubscribeNotification(email).block();
                }
            });
        return Result.doNotRetry();
    }

    @Override
    public Controller setupWith(ControllerBuilder builder) {
        return builder
            .extension(new Follow())
            .build();
    }
}
