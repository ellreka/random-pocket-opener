const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: './server/index.js',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: './bundle.server.js'
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};