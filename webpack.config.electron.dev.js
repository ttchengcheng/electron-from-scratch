const cfg = require('./webpack.config.modules');

module.exports = [cfg([
    'electronMain',
    'typescript',
    'sourceMap',
    'tslint',
    'development',
  ]),
  cfg([
    'electronRender',
    'render',
    'typescript',
    'styles',
    'sourceMap',
    'tslint',
    'development',
  ]),
];