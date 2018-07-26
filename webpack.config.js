const webpack = require('webpack');

module.exports = {
  entry: './src/index.tsx',
  module: {
    rules: [{
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.css$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  output: {
    filename: './bundle.js'
  },
  mode: 'production',
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.jsx'
    ]
  },
  devtool: 'source-map'
};