var webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  module: {
    rules: [
      // tsx, jsx loader
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      // add source-map support
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
  devtool: "source-map",
  devServer: {
    contentBase: '.',
    historyApiFallback: true
  }
}