# Babel

### 什麼是babel
它可以讓你使用目前瀏覽器或node不支援的語法

### 設定

- .babelrc

```js
// 基本上至少需要使用到stage-2
{
  "presets": ["es2015", "stage-2"]
}
```

> es2015 中的功能，肯定會出現在 ES6 的官方版本，而 stages 0-3 的 presets ，則是未來 JavaScript 規範的一些提案，現在還在草案階段。如果選擇的 stage 越低，你使用的 features 之後將不支援的風險越高。

```sh
npm install --save-dev babel-preset-es2015 babel-preset-stage-2
```