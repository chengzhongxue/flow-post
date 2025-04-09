import {
  type Editor,
  isActive,
  mergeAttributes,
  Node,
  nodeInputRule,
  type Range,
  VueNodeViewRenderer,
  type EditorState, 
  BlockActionSeparator,
} from "@halo-dev/richtext-editor";
import FollowCardView from "./FollowCardView.vue";
import { markRaw } from "vue";
import { ToolboxItem } from "@halo-dev/richtext-editor";
import MdiDeleteForeverOutline from "~icons/mdi/delete-forever-outline?color=red";
import { deleteNode } from "../utils/delete-node";
import MingcuteFollowLine from '~icons/mingcute/follow-line?width=1.2em&height=1.2em';
import MdiFormatAlignCenter from "~icons/mdi/format-align-center";
import MdiFormatAlignLeft from "~icons/mdi/format-align-left";
import MdiFormatAlignRight from "~icons/mdi/format-align-right";

declare module "@halo-dev/richtext-editor" {
  interface Commands<ReturnType> {
    "follow-card": {
      setFollowCard: (options:{}) => ReturnType;
    };
  }
}

const FollowCardExtension = Node.create({
  name: "follow-card",
  fakeSelection: true,

  group() {
    return "block";
  },

  addAttributes() {
    return {
      ...this.parent?.(),
      textAlign: {
        default: "center",
        parseHTML: (element) => {
          return element.getAttribute("text-align");
        },
        renderHTML: (attributes) => {
          return {
            "text-align": attributes.textAlign,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "follow-card",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["follow-card", mergeAttributes(HTMLAttributes)];
  },
  
  addCommands() {
    return {
      setFollowCard:
        (options) =>
          ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          },
    };
  },
  
  addInputRules() {
    return [
      nodeInputRule({
        find: /^\$follow-card\$$/,
        type: this.type,
      }),
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(FollowCardView);
  },

  addOptions() {
    return {
      getCommandMenuItems() {
        return {
          priority: 2e2,
          icon: markRaw(MingcuteFollowLine),
          title: "订阅文章卡片",
          keywords: ["follow-card", "follow", "订阅文章"],
          command: ({ editor, range }: { editor: Editor; range: Range }) => {
            editor
              .chain()
              .focus()
              .setFollowCard({})
              .deleteRange(range)
              .run();
          },
        };
      },
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 59,
          component: markRaw(ToolboxItem),
          props: {
            editor,
            icon: markRaw(MingcuteFollowLine),
            title: "订阅文章卡片",
            action: () => {
              editor
                .chain()
                .focus()
                .setFollowCard({})
                .run();
            },
          },
        };
      },
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: "follow-card-bubble-menu",
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state, FollowCardExtension.name);
          },
          items: [
            {
              priority: 10,
              props: {
                icon: markRaw(MdiFormatAlignLeft),
                title: "左",
                isActive: () => editor.isActive(FollowCardExtension.name,{ textAlign: "left" }),
                action: () => editor.commands.updateAttributes(FollowCardExtension.name, { textAlign: "left",}),
              },
            },
            {
              priority: 20,
              props: {
                icon: markRaw(MdiFormatAlignCenter),
                title: "居中",
                isActive: () => editor.isActive(FollowCardExtension.name,{ textAlign: "center" }),
                action: () => editor.commands.updateAttributes(FollowCardExtension.name, { textAlign: "center",}),
              },
            },
            {
              priority: 30,
              props: {
                icon: markRaw(MdiFormatAlignRight),
                title: "右",
                isActive: () => editor.isActive(FollowCardExtension.name,{ textAlign: "right" }),
                action: () => editor.commands.updateAttributes(FollowCardExtension.name, { textAlign: "right",}),
              },
            },
            {
              priority: 50,
              component: markRaw(BlockActionSeparator),
            },
            {
              priority: 60,
              props: {
                icon: markRaw(MdiDeleteForeverOutline),
                title: "删除",
                action: ({ editor }: { editor: Editor }) => {
                  deleteNode(FollowCardExtension.name, editor);
                },
              },
            },
          ],
        };
      },
    }
  }


})

export default FollowCardExtension;
