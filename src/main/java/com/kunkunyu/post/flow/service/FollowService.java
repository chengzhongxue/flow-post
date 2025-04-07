package com.kunkunyu.post.flow.service;

import com.kunkunyu.post.flow.FollowQuery;
import com.kunkunyu.post.flow.extension.Follow;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ListResult;

public interface FollowService {

    Mono<ListResult<Follow>> listFollow(FollowQuery query);

    Mono<Void> submitFollow(Follow follow);

    Mono<Void> confirmFollow(String name,String token);

    Mono<Void> cancelFollow(String name,String token);

    Mono<Void> subscribeNotification(String email);

    Mono<Void> unSubscribeNotification(String email);
}
