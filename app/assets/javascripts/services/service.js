'use strict';
var ApiService = angular.module('ApiService', []);
var FayeServerURL = "http://localhost:9292/faye";
ApiService.factory('homeService', ["$http", "$window", "$q", "$rootScope", function($http, $window, $q, $rootScope) {
  return {
    user_registration: function(data){
      return $http.post('/users.json', { user: data }).then(function(data){
        return data.data;
      });
    },
    user_session: function(data){
      return $http.post('/users/sign_in.json',{user: data}).then(function(data){
        return data.data;
      });
    },
    check_current_user: function(data){
      return $http.get('/api/v1/users/check_current_user.json').then(function(data){
        return data.data;
      });
    }
  };
}]);

ApiService.factory('Faye', function() {
  var client = new Faye.Client(FayeServerURL);
  return {
    publish: function(channel, message) {
      client.publish(channel, message);
    },
    subscribe: function(channel, callback) {
      client.subscribe(channel, callback);
    },
    un_subscribe: function(channel) {
      client.unsubscribe(channel);
    }
  }
});