package com.kunkunyu.post.flow.extension;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import run.halo.app.core.extension.attachment.Constant;
import run.halo.app.extension.AbstractExtension;
import run.halo.app.extension.GVK;

import java.util.UUID;

import static com.kunkunyu.post.flow.extension.Follow.KIND;
import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Data
@ToString(callSuper = true)
@GVK(kind = KIND, group = "flow.post.kunkunyu.com",
    version = Constant.VERSION, singular = "follow", plural = "follows")
@EqualsAndHashCode(callSuper = true)
public class Follow extends AbstractExtension {

    public static final String KIND = "Follow";

    @Schema(requiredMode = REQUIRED)
    private String email;

    @Schema(requiredMode = REQUIRED,defaultValue = "pending")
    private FollowStatus status;

    @Schema(requiredMode = REQUIRED)
    private String token;

    public static enum FollowStatus {
        pending,
        confirm,
        cancel;
    }

    /**
     * Generate token for unsubscribe.
     *
     * @return token
     */
    public static String generateToken() {
        return UUID.randomUUID().toString();
    }

}
