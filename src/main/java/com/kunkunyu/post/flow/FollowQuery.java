package com.kunkunyu.post.flow;

import io.swagger.v3.oas.annotations.enums.ParameterIn;
import org.apache.commons.lang3.StringUtils;
import org.springdoc.core.fn.builders.operation.Builder;
import org.springframework.lang.Nullable;
import org.springframework.web.reactive.function.server.ServerRequest;
import run.halo.app.extension.ListOptions;
import run.halo.app.extension.router.IListRequest;
import run.halo.app.extension.router.SortableRequest;

import java.util.Optional;

import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static run.halo.app.extension.index.query.QueryFactory.contains;
import static run.halo.app.extension.index.query.QueryFactory.equal;
import static run.halo.app.extension.index.query.QueryFactory.or;
import static run.halo.app.extension.router.QueryParamBuildUtil.sortParameter;

public class FollowQuery extends SortableRequest {


    public FollowQuery(ServerRequest request) {
        super(request.exchange());
    }

    @Nullable
    public String getKeyword() {
        return queryParams.getFirst("keyword");
    }


    @Nullable
    public String getStatus() {
        return queryParams.getFirst("status");
    }

    @Override
    public ListOptions toListOptions() {
        var builder = ListOptions.builder(super.toListOptions());

        Optional.ofNullable(getKeyword())
            .filter(StringUtils::isNotBlank)
            .ifPresent(keyword -> builder.andQuery(or(
                contains("email", keyword),
                contains("metadata.name", keyword)
            )));

        Optional.ofNullable(getStatus())
            .filter(StringUtils::isNotBlank)
            .ifPresent(status -> builder.andQuery(equal("status", status)));

        return builder.build();
    }

    public static void buildParameters(Builder builder) {
        IListRequest.buildParameters(builder);
        builder.parameter(sortParameter())
            .parameter(parameterBuilder()
                .in(ParameterIn.QUERY)
                .name("keyword")
                .description("Follow filtered by keyword.")
                .implementation(String.class)
                .required(false))
            .parameter(parameterBuilder()
                .in(ParameterIn.QUERY)
                .name("status")
                .description("Follow status.")
                .implementation(String.class)
                .required(false));
    }
}
