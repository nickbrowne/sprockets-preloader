var path = require('path');

var importsDecorator = require('./decorators/imports.js');
var requireDecorator = require('./decorators/require.js');

var pathIndication = 'assets/javascripts';

module.exports = function(context, file, options) {
  options = options || {};
  if (/.eco$/.exec(file)) {
    // There is a better way to do this...
    // - get root path for rails javascript assets from context

    var determineAssetsRoot = require('./assets-root.js');
    var assetsRoot = determineAssetsRoot(context);

    var relativePathFromAssetsRoot = path.relative(assetsRoot, file);
    var relativePath = path.relative(context, file);

    var lines = [
      'window.JST = window.JST || {};',
      'window.JST[\'' + relativePathFromAssetsRoot.slice(0, -8) + '\'] = ' + requireDecorator(importsDecorator(relativePath, { module: true, require: true }))
    ];

    return lines;
  } else {
    if (file.indexOf('app/assets') !== -1) { options.module = true; }
    file = path.relative(context, file);
    file = importsDecorator(file, options);
    file = requireDecorator(file);
    return file;
  }
};
