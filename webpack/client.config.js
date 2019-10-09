const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './client/index.js',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    port: 3000,
    compress: true,
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
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
      template: path.resolve(__dirname, '../client/index.html') ,
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: './favicon.ico'},
      { from: './images', to: 'images' }
    ])
  ]
};