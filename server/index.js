var path = require('path');

// To resolve shared folder during server development transpiling
var sharedFolder = require('babel-resolver')(
  path.resolve(process.cwd(), 'app/shared')
);

var babelConfig = require('../package').babelConfig.server;
babelConfig = Object.assign(babelConfig, { resolveModuleSource: sharedFolder });

require('babel-register')(babelConfig);
require('babel-polyfill');
require('css-modules-require-hook')({
  generateScopedName: () => '[folder]__[local]--[hash:base64:5]'
});
require('./server.js');
