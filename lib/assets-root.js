var specPathIndication = 'spec/javascripts';
var pathIndication = 'assets/javascripts';
var appPath = 'app/assets/javascripts';

module.exports = function(context) {
  var assetsRoot;

  if (context.indexOf(pathIndication) != -1) {
    assetsRoot = context.slice(0, context.indexOf(pathIndication) + pathIndication.length);
  } else {
    assetsRoot = context.slice(0, context.indexOf(specPathIndication));
    assetsRoot = assetsRoot + appPath
  }

  return assetsRoot;
};
