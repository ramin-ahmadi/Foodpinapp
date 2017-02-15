angular.module('analytics.mixpanel', [])
.provider('$mixpanel', function () {
  var apiKey, superProperties;

  function init() {
    if (!Object.prototype.hasOwnProperty.call(window, 'mixpanel')) {
      throw 'Global `mixpanel` not available. Did you forget to include the library on the page?';
    }
    mixpanel.init(apiKey, {persistence: 'localStorage'});
    waitTillAsyncApiLoaded(function () {
      if (superProperties) mixpanel.register(superProperties);
    });
  }

  function waitTillAsyncApiLoaded(callback) {
    if (!Object.prototype.hasOwnProperty.call(window, 'mixpanel') || (window.mixpanel.__loaded === undefined)) {
      setTimeout(function () {
        waitTillAsyncApiLoaded(callback);
      }, 500);
    }
    callback();
  }

  function callMixpanelFn(name) {
    return function () {
      var fn = window.mixpanel,
          parts = name.split('.'),
          scope, i;
      for (i = 0; i < parts.length; i++) {
        scope = fn;
        fn = fn[parts[i]];
      }
      return fn.apply(scope, arguments);
    };
  }

  this.apiKey = function (key) {
    if (!key) return apiKey;
    apiKey = key;
  };

  this.superProperties = function (properties) {
    if (!properties) return superProperties;
    superProperties = properties;
  };

  this.$get = function () {
    init();
    return {
      init: callMixpanelFn('init'),
      push: callMixpanelFn('push'),
      disable: callMixpanelFn('disable'),
      track: callMixpanelFn('track'),
      track_links: callMixpanelFn('track_links'),
      track_forms: callMixpanelFn('track_forms'),
      register: callMixpanelFn('register'),
      register_once: callMixpanelFn('register_once'),
      unregister: callMixpanelFn('unregister'),
      identify: callMixpanelFn('identify'),
      get_distinct_id: callMixpanelFn('get_distinct_id'),
      alias: callMixpanelFn('alias'),
      set_config: callMixpanelFn('set_config'),
      get_config: callMixpanelFn('get_config'),
      get_property: callMixpanelFn('get_property'),
      people: {
        set: callMixpanelFn('people.set'),
        set_once: callMixpanelFn('people.set_once'),
        increment: callMixpanelFn('people.increment'),
        append: callMixpanelFn('people.append'),
        track_charge: callMixpanelFn('people.track_charge'),
        clear_charges: callMixpanelFn('people.clear_charges'),
        delete_user: callMixpanelFn('people.delete_user')
      }
    };
  };
})
.config(function($mixpanelProvider, MIXPANEL_API_KEY, APP_NAME, APP_VERSION, MIXPANEL_DOWNLOAD_REFERRAL, MIXPANEL_OPENED_USING) {
  $mixpanelProvider.apiKey(MIXPANEL_API_KEY);

  $mixpanelProvider.superProperties({
    download_referral: MIXPANEL_DOWNLOAD_REFERRAL,
    opened_using: MIXPANEL_OPENED_USING,
    app: APP_NAME,
    app_version: APP_VERSION
  });
})

;

angular.module("your_app_name.tracking", ['analytics.mixpanel'])
.run(function($ionicPlatform, $rootScope, $state, $mixpanel) {
  $ionicPlatform.on("deviceready", function(){
    if(ionic.Platform.isWebView())
    {
      var deviceInformation = ionic.Platform.device();
      $mixpanel.identify(deviceInformation.uuid);
      $mixpanel.register(deviceInformation);
      $mixpanel.track("Opened App");

      $rootScope.$on("$stateChangeSuccess", function() {
        $mixpanel.track("Navigated to", {
          "view": $state.current.name
        });
    	});
    }
  });

  $ionicPlatform.on("resume", function(){
    if(ionic.Platform.isWebView())
    {
      $mixpanel.track("Resumed App");
    }
  });
})

.factory("stacktraceService", function(){
	return({
		print: printStackTrace
	});
})

.config(function ($provide) {
  $provide.decorator("$exceptionHandler", function($delegate, stacktraceService, $window, $mixpanel) {
    return function (exception, cause) {
			var errorMessage = exception.toString(),
					stackTrace = stacktraceService.print({ e: exception }),
					errorDetails = {
						stack_trace: stackTrace,
						url: $window.location.href
					};

      if(ionic.Platform.isWebView())
      {
        $mixpanel.track('JavaScript Error', errorDetails);
      }

      $delegate(exception, cause);
    };
  });
})
;
