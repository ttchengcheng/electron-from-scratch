var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  module: {
    rules: [
      // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' } },
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      // {
      //   test: /\.less$/,
      //   loaders: ["style-loader", "css-loder", "less-loader"]
      // },
      // addition - add source-map support
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  // externals: {
  //   "react": "React",
  //   "react-dom": "ReactDOM",
  // },
  devtool: "source-map",
  // devServer: {
  //   contentBase: parentDir,
  //   historyApiFallback: true
  // }
}