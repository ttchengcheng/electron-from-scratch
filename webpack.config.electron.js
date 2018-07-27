const cfg = require('./webpack.config.modules');

module.exports = [cfg([
    'electronMain',
    'typescript',
    'sourceMap',
    'tslint',
    'production',
  ]),
  cfg([
    'electronRender',
    'render',
    'typescript',
    'styles',
    'sourceMap',
    'tslint',
    'production',
  ]),
];