# flow-post

## 使用方式

### 默认编辑器

![Snipaste_2025-04-07_21-38-41.webp](https://api.minio.yyds.pink/halo-docs/2025/04/Snipaste_2025-04-07_21-38-41.webp)
![Snipaste_2025-04-07_21-39-09.webp](https://api.minio.yyds.pink/halo-docs/2025/04/Snipaste_2025-04-07_21-39-09.webp)

### 作为标签使用

``` html
<!-- 显示默认标题 -->
<follow-card></follow-card>

<!-- 不显示标题 -->
<follow-card show-title="false"></follow-card>

<!-- 自定义标题 -->
<follow-card title-text="订阅我的博客更新"></follow-card>

<!-- 同时设置对齐方式和标题 -->
<follow-card text-align="left" title-text="加入我的订阅列表"></follow-card>

<!-- 输入框与订阅按键强制多行显示 -->
<follow-card show-multiline="true"></follow-card>
```

## 预览

![Snipaste_2025-04-07_22-05-12.webp](https://api.minio.yyds.pink/halo-docs/2025/04/Snipaste_2025-04-07_22-05-12.webp)
![Snipaste_2025-04-07_22-05-21.webp](https://api.minio.yyds.pink/halo-docs/2025/04/Snipaste_2025-04-07_22-05-21.webp)

## 主题适配

### 自定义样式

目前已提供的 CSS 变量：

| 变量名 | 描述 |
|--------|------|
| --follow-title-color | 标题文字颜色 |
| --follow-description-color | 描述文字颜色 |
| --follow-bg-color | 卡片背景色 |
| --follow-input-bg | 输入框背景色 |
| --follow-input-border | 输入框边框颜色 |
| --follow-input-radius | 输入框圆角 |
| --follow-button-bg | 按钮背景色 |
| --follow-button-text | 按钮文字颜色 |
| --follow-button-radius | 按钮圆角 |
| --follow-card-shadow | 卡片阴影效果 |
| --follow-card-border | 卡片边框样式 |
| --follow-card-radius | 卡片圆角 |
| --follow-card-padding-sm | 卡片小屏幕内边距 |
| --follow-card-padding-md | 卡片中屏幕内边距 |
| --follow-card-padding-lg | 卡片大屏幕内边距 |


### 配色切换方案

根据上面提供的 CSS 变量，也可以通过定义 CSS 变量的方式为订阅卡片提供动态切换配色的功能。
以下是实现示例，你可以根据需求自行修改选择器或者媒体查询。

``` css

:root {

  --follow-card-radius: 1rem;    /* 卡片圆角 */
  --follow-input-radius: 0.5rem; /* 输入框圆角 */
  --follow-button-radius: 0.5rem; /* 按钮圆角 */

  /* 卡片内边距 */
  --follow-card-padding-sm: 1.5rem;  /* 小屏幕内边距 */
  --follow-card-padding-md: 2rem;    /* 中屏幕内边距 */
  --follow-card-padding-lg: 3rem;    /* 大屏幕内边距 */
  
  /* 卡片边框 */
  --follow-card-border: 1px solid #e2e8f0;
}

@media (prefers-color-scheme: dark) {
  .color-scheme-auto,
  [data-color-scheme='auto'] follow-card {
    color-scheme: dark;
    --follow-title-color: #f4f4f5;
    --follow-description-color: #a1a1aa;
    --follow-bg-color: #18181b;
    --follow-input-bg: #27272a;
    --follow-input-border: #3f3f46;
    --follow-button-bg: #3b82f6;
    --follow-button-text: #ffffff;
    --follow-card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
    --follow-card-border: 1px solid rgba(255, 255, 255, 0.2);
  }
}

.color-scheme-dark,
.dark,
[data-color-scheme='dark'] follow-card {
  color-scheme: dark;

  --follow-title-color: #f4f4f5;
  --follow-description-color: #a1a1aa;
  --follow-bg-color: #18181b;
  --follow-input-bg: #27272a;
  --follow-input-border: #3f3f46;
  --follow-button-bg: #3b82f6;
  --follow-button-text: #ffffff;
  --follow-card-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.2);
  --follow-card-border: 1px solid rgba(255, 255, 255, 0.2);
}

```

此外，为了让主题可以更加方便的适配暗黑模式，此插件也提供了一套暗黑模式的配色方案，主题可以直接使用此方案，而不需要自己去适配暗黑模式，适配方式如下：

1. 在 html 或者 body 标签添加 class：
   - `color-scheme-auto`：自动模式，根据系统的暗黑模式自动切换。
   - `color-scheme-dark` / `dark`：强制暗黑模式。
   - `color-scheme-light` / `light`：强制明亮模式。
2. 在 html 或者 body 标签添加 data-color-scheme 属性：
   - `auto`：自动模式，根据系统的暗黑模式自动切换。
   - `dark`：强制暗黑模式。
   - `light`：强制明亮模式。

    