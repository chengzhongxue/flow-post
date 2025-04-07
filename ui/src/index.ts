import { definePlugin } from "@halo-dev/console-shared";
import { markRaw } from "vue";
import Follows from "@/views/Follows.vue";
import '@kunkunyu/follow-card';
import {FollowCardExtension} from "@/editor";
import MingcuteFollowLine from '~icons/mingcute/follow-line?width=1.2em&height=1.2em';

export default definePlugin({
  components: {},
  routes: [
    {
      parentName: "ToolsRoot",
      route: {
        path: "/follow",
        name: "Follow",
        component: Follows,
        meta: {
          title: "文章订阅",
          description: "允许用户轻松订阅您的网站或博客，及时获取最新文章通知。支持邮件订阅、推送提醒等功能，帮助您留住读者并提升互动率",
          searchable: true,
          menu: {
            name: "文章订阅",
            icon: markRaw(MingcuteFollowLine),
            priority: 0,
          },
        },
      },
    },
  ],
  extensionPoints: {
    "default:editor:extension:create": () => {
      return [FollowCardExtension];
    },
  },
});
