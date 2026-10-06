# 神奇手机 · 前端界面

角色卡《神奇手机》的前端面板。由 [tavern_helper_template](https://github.com/StageDog/tavern_helper_template) 构建。

`index.html` 是自包含的单文件产物（Vue 3 + 全部依赖已内联）。

## 用法

角色卡里的正则把 `<面板/>` 替换成：

```html
<script>
$('body').load('https://testingcf.jsdelivr.net/gh/fkgzs123321/galgame-shenqishouji@<commit>/index.html')
</script>
```

★ 用 commit 号而不是分支名 —— 分支名会被 jsdelivr 缓存，commit 号不会。
