const cfg = require('./webpack.config.modules');

module.exports = cfg([
  'render',
  'typescript',
  'styles',
  'sourceMap',
  'tslint',
  'development',
  'devServer'
]);
