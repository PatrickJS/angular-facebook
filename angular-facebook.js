;(function(module, angular, window, undefined) {
'use strict';

/* angular Facebook */
module

module.provider('FB', function() {
  var _asyncLoading = false;
  var _scriptUrl = '//connect.facebook.net/en_US/all.js';
  var _scriptId = 'facebook-jssdk';

  this.asyncLoading = function(config) {
    _asyncLoading = config || _asyncLoading;
    return this;
  };

  this.scriptUrl = function(url, id) {
    _scriptUrl = url || _scriptUrl;
    _scriptId = id || _scriptId;
    return this;
  };

  this.scriptId = function(id) {
    _scriptId = id || _scriptId;
    return this;
  };

  // Create a script tag with moment as the source
  // and call our onScriptLoad callback when it
  // has been loaded
  function createScript($document, callback) {
    var scriptTag = $document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.async = true;
    scriptTag.id = _scriptId;
    scriptTag.src = _scriptUrl;
    scriptTag.onreadystatechange = function () {
      if (this.readyState == 'complete') {
        callback();
      }
    }
    scriptTag.onload = callback;
    var s = $document.getElementsByTagName('body')[0];
        s.appendChild(scriptTag);
  }
});

}(angular.module('angular-facebook', []), angular, window);
