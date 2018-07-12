'use strict';
var spritle = angular.module('spritlePostApp', [
  'ui.router',
  'templates',
  'ngAnimate',
  'ngResource',
  'ui-notification',
  'ui.bootstrap',
  'ngStorage',
  'ngFileUpload',
  'ApiService',
  'appHeader',
  'homes',
  'signUp',
  'signIn',
  'posts'
]);

spritle.run(['$window', '$rootScope', '$state', '$animate', '$localStorage', function($window, $rootScope, $state, $animate, $localStorage){
  $animate.enabled(true);
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
    $rootScope.$broadcast('headerReload', true);
  });
}]);