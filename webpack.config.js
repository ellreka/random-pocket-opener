const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000,
    compress: true,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
              importLoaders: 2
            }
          },
          {
            loader: "sass-loader",
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html') ,
      filename: 'index.html'
    })
  ]
};