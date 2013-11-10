;(function(module, angular, window, undefined) {
'use strict';

/* angular Facebook */

module.provider('FB', function() {
  var _asyncLoading = false;
  var _scriptUrl = '//connect.facebook.net/en_US/all.js';
  var _scriptId = 'facebook-jssdk';
  var _appId = null;
  var _channelUrl = 'app/channel.html';
  var _status = true;
  var _cookie = true;
  var _xfbml = true;

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

  this.appId = function(id) {
    _appId = id || _appId;
    return this;
  };

  this.appId = function(url) {
    _channelUrl = url || _channelUrl;
    return this;
  };

  this.appId = function(config) {
    _status = config && _status;
    return this;
  };

  this.appId = function(config) {
    _cookie = config && _cookie;
    return this;
  };

  this.appId = function(config) {
    _xfbml = config && _xfbml;
    return this;
  };

  // Create a script tag with moment as the source
  // and call our onScriptLoad callback when it
  // has been loaded
  function createScript($document, callback, success) {
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

  this.$get = function($q, $rootScope, $window) {
    var deferred = $q.defer();
    var _FB = $window.FB;

    function successFN() {
      $window.fbAsyncInit = function() {
        // Executed when the SDK is loaded
        FB.init({
          /*
           The app id of the web app;
           To register a new app visit Facebook App Dashboard
           ( https://developers.facebook.com/apps/ )
          */
          appId: _appId,
          /*
           Adding a Channel File improves the performance
           of the javascript SDK, by addressing issues
           with cross-domain communication in certain browsers.
          */
          channelUrl: _channelUrl,
          /*
           Set if you want to check the authentication status
           at the start up of the app
          */
          status: _status,
          /*
           Enable cookies to allow the server to access
           the session
          */
          cookie: _cookie,
          /* Parse XFBML */
          xfbml: _xfbml
        });
      };
    }

    deferred.isPromise = true;
    _FB.isPromise = false;

    if (_asyncLoading) {
      // Load client in the browser
      var onScriptLoad = function(callback) {
        successFN();
        $timeout(function() {
          deferred.resolve($window.FB);
        });
      };
      createScript($document[0], onScriptLoad);
    } else {
      successFN();
    }

    return (_asyncLoading) ? deferred.promise: _FB;
  }
});

}(angular.module('ngFacebook', []), angular, window);
