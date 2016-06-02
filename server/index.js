const babelConfig = require('../package').babelConfig.server;
require('babel-register')(babelConfig);
require('babel-polyfill');
require('css-modules-require-hook')({
  generateScopedName: () => '[name]__[local]--[hash:base64:5]'
});
require('./server.js');
