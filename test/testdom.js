/* setup.js */

var jsdom = require('jsdom');
var localStorage = require('localStorage');
var doc = jsdom.jsdom('<!doctype html><html><body><div id="ui-view"></div></body></html>');

var exposedProperties = ['window', 'navigator', 'document'];

global.document = doc;
global.window = document.defaultView;
global.window.$ = require('jquery');
global.window.localStorage = localStorage;
global.localStorage = localStorage;
global.window.$.fn.sideNav = function() {
  return;
};

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
