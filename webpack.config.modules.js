const merge = require('webpack-merge');

let cfgModules = {
  typescript: {
    module: {
      rules: [ //
        {
          test: /\.(t|j)sx?$/,
          use: {
            loader: "awesome-typescript-loader"
          }
        },
      ]
    },
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx"
      ]
    },
  },
  sourceMap: {
    module: {
      rules: [ //
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
      ]
    },
    devtool: "source-map",
  },
  styles: {
    module: {
      rules: [ //
        {
          test: /\.css$/,
          use: [{
              loader: "style-loader"
            },
            {
              loader: "css-loader"
            }
          ]
        }
      ]
    },
  },
  tslint: {
    module: {
      rules: [ //
        {
          test: /\.tsx?$/,
          enforce: "pre",
          use: [{
            loader: "tslint-loader",
            options: {
              configFile: "./tslint.json",
              tsConfigFile: "./tsconfig.json"
            }
          }]
        }
      ]
    },
  },
  development: {
    mode: "development"
  },
  production: {
    mode: "production"
  },
  devServer: {
    devServer: {
      contentBase: '.',
      historyApiFallback: true
    }
  },
  render: {
    entry: "./src/index.tsx",
    output: {
      filename: "./bundle.js",
    },
  },
  electronRender: {
    target: "electron-renderer"
  },
  electronMain: {
    entry: "./src/main.ts",
    output: {
      filename: "./main.js",
    },
    node: {
      __dirname: false,
      __filename: false
    },
    target: "electron-main"
  },
}

module.exports = (mods) => {
  if (!Array.isArray(mods)) {
    return;
  }

  let cfg = {};
  for (let mod of mods) {
    if (typeof mod !== 'string') {
      console.error('module [' + mod + '] is not valid')
      continue;
    }

    let modCfg = cfgModules[mod];
    if (!modCfg) {
      console.error('module [' + mod + '] is not valid')
      continue;
    }
    cfg = merge(cfg, modCfg);
  }

  // 打印合并的结果
  console.log(JSON.stringify(cfg, (k, v) => {
    if (v instanceof RegExp) {
      return v.toString();
    }
    return v;
  }, ' '));

  return cfg;
};