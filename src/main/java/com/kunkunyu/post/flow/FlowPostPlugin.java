package com.kunkunyu.post.flow;

import com.kunkunyu.post.flow.extension.Follow;
import org.springframework.stereotype.Component;
import run.halo.app.extension.SchemeManager;
import run.halo.app.extension.index.IndexSpec;
import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;

import static run.halo.app.extension.index.IndexAttributeFactory.simpleAttribute;


@Component
public class FlowPostPlugin extends BasePlugin {

    private final SchemeManager schemeManager;


    public FlowPostPlugin(PluginContext pluginContext, SchemeManager schemeManager) {
        super(pluginContext);
        this.schemeManager = schemeManager;
    }

    @Override
    public void start() {
        schemeManager.register(Follow.class, indexSpecs -> {
            indexSpecs.add(new IndexSpec()
                .setName("email")
                .setIndexFunc(simpleAttribute(
                    Follow.class, follow -> follow.getEmail())));
            indexSpecs.add(new IndexSpec()
                .setName("status")
                .setIndexFunc(simpleAttribute(Follow.class, follow -> {
                    var status = follow.getStatus();
                    return status == null ? null : status.name();
                })));

        });
    }

    @Override
    public void stop() {
        schemeManager.unregister(schemeManager.get(Follow.class));
    }
}
