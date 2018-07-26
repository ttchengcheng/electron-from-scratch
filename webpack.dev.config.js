const webpack = require('webpack');

module.exports = {
  "entry": "./src/index.tsx",
  "module": {
    "rules": [
      {
        "test": /\.tsx?$/,
        "enforce": "pre",
        "use": [
          {
            "loader": "tslint-loader",
            "options": {
              "configFile": "./tslint.json",
              "emitErrors": false,
              "failOnHint": true,
              "typeCheck": false,
              "fix": false,
              "tsConfigFile": "tsconfig.json"
            }
          }
        ]
      },
      {
        "test": /\.(t|j)sx?$/,
        "use": {
          "loader": "awesome-typescript-loader"
        }
      },
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader"
      },
      {
        "test": /\.css$/,
        "use": [
          {
            "loader": "style-loader"
          },
          {
            "loader": "css-loader"
          }
        ]
      }
    ]
  },
  "output": {
    "filename": "./bundle.js"
  },
  "mode": "development",
  "resolve": {
    "extensions": [
      ".ts",
      ".tsx",
      ".js",
      ".jsx"
    ]
  },
  "devtool": "source-map",
  "devServer": {
    "contentBase": ".",
    "historyApiFallback": true
  }
};