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
});

}(angular.module('angular-facebook', []), angular, window);
