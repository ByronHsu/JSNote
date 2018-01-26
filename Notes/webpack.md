# Webpack
> 一個強大的程式碼打包工具

### Why we need webpack?

- 將你的 js 檔案 Bundle 變成單一的檔案
- 在你的前端程式碼中使用 npm packages
- 撰寫 JavaScript ES6 或 ES7（需要透過 babel 來幫助）
- Minify 或優化程式碼
- 將 LESS 或 SCSS 轉換成 CSS
- 使用 HMR（Hot Module Replacement）
- 包含任何類型的檔案到你的 JavaScript

### Basic example
> 透過例子來學習

- webpack.config.dev.js

測試環境基本config

```js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 適合dev環境使用的debug tool
  devtool: 'cheap-eval-source-map',
  // 兩個新的進入點將伺服器連結到瀏覽器，方便 HMR。
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/index'
  ],
  // 輸出到dist/ 叫 bundle.js
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // 使用hot,html plugin
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 使用loader
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.html$/,
      loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
    }]
  },
  // dev server基本config
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
```

- webpack.config.prod.js

```js
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 適合prod mode安裝的debug tool
  devtool: 'source-map',
  entry: ['./src/index'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
  	// 醜化程式碼
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    // 讓出現頻率較少的詞短一點
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    // 定義全局變數, 注意！！是在compile時就被解析！！！
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  }
}
```

#### Reference
https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/