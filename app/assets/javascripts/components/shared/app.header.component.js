angular.module('appHeader', ['ngResource']);
angular.module('appHeader')
.component('appHeader', {
  templateUrl: '/templates/shared/header.html',
  controller: ['$http', '$stateParams', 'homeService', '$uibModal', '$localStorage', 'Notification', '$scope', '$state', '$rootScope', '$window', 'Faye', function HeaderController($http, $stateParams, $homeService, $uibModal, $localStorage, Notification, $scope, $state, $rootScope, $window, Faye) {
    var self = this;
    
    self.afterReload = function(){
      $homeService.check_current_user().then(function(data) {
        if (data.status){
          self.user_logged_in = true;
        } else {
          self.user_logged_in = false;
        }
      });
    };

    self.afterReload();

    $scope.$on('headerReload', function (event, data) {
      if (data)
        self.afterReload();
    });
  }]
});
