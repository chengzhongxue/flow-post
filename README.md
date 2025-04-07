# flow-post

## 使用方式

### 默认编辑器

![Snipaste_2025-04-07_21-38-41.webp](https://api.minio.yyds.pink/halo-docs/2025/04/Snipaste_2025-04-07_21-38-41.webp)
![Snipaste_2025-04-07_21-39-09.webp](https://api.minio.yyds.pink/halo-docs/2025/04/Snipaste_2025-04-07_21-39-09.webp)

### 作为标签使用

``` html
<follow-card></follow-card>
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
| --follow-button-bg | 按钮背景色 |
| --follow-button-text | 按钮文字颜色 |
| --follow-card-shadow | 卡片阴影效果 |


### 配色切换方案

根据上面提供的 CSS 变量，也可以通过定义 CSS 变量的方式为订阅卡片提供动态切换配色的功能。
以下是实现示例，你可以根据需求自行修改选择器或者媒体查询。

``` css
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

    