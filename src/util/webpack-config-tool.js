/*
Usage:

const cfg = require('./src/util/webpack-config-tool')

module.exports = cfg([
  'modeDev',
  'tslint',
  'typescript',
  'sourceMap',
  'style',
  'devServer'
]);

*/

let WebpackConfigTool = {
  base: {
    entry: './src/index.tsx',
    module: {
      rules: []
    },
    output: {
      filename: './bundle.js',
    }
  },

  create() {
    return JSON.parse(JSON.stringify(this.base));
  },

  merge(config, mod) {
    if (!mod) {
      return;
    }

    for (let attName in mod) {
      let att = mod[attName];
      if (Array.isArray(att)) {
        config[attName] = config[attName] || [];
        config[attName] = config[attName].concat(att);
      } else if (typeof att === 'object') {
        config[attName] = config[attName] || {};
        this.merge(config[attName], att);
      } else {
        config[attName] = att;
      }
    }
  }
};

WebpackConfigTool.modeDev = {
  mode: 'development'
},

  WebpackConfigTool.modeProd = {
    mode: 'production'
  },

  // tslint-loader
  WebpackConfigTool.tslint = {
    module: {
      rules: [{
        test: /\.tsx?$/,
        enforce: 'pre',
        use: [{
          loader: 'tslint-loader',
          options: {
            configFile: './tslint.json',
            emitErrors: false,
            failOnHint: true,
            typeCheck: false,
            fix: false,
            tsConfigFile: 'tsconfig.json'
          }
        }]
      }]
    }
  },

  // awesome-typescript-loader
  WebpackConfigTool.typescript = {
    module: {
      rules: [{
        test: /\.(t|j)sx?$/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      }]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
  },

  // source-map-loader
  WebpackConfigTool.sourceMap = {
    module: {
      rules: [{
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }]
    },
    devtool: 'source-map'
  },

  // style-loader & css-loader
  WebpackConfigTool.style = {
    module: {
      rules: [{
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        },
          {
            loader: 'css-loader',
          },
        ],
      }]
    }
  },

  WebpackConfigTool.devServer = {
    devServer: {
      contentBase: '.',
      historyApiFallback: true
    }
  }

module.exports = (modules) => {
  if (!Array.isArray(modules)) {
    console.error('failed to create webpack config: modules is not an array');
    return;
  }
  let cfg = WebpackConfigTool.create();

  for (let modId of modules) {
    let mod = WebpackConfigTool[modId];
    if (!mod) {
      let modName = modId ? JSON.stringify(modId) : '';
      console.error('failed to create webpack config: module [' + modName + '] is not valid');
      return;
    }

    WebpackConfigTool.merge(cfg, mod);
  }

  return cfg;
}