angular.module('signIn', ['ngResource','ngStorage']);
angular.module('signIn')
.component('signIn', {
  templateUrl: '/templates/sign_in/index.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'Notification', function SignupController($http, $stateParams, $state, $localStorage, $homeService, Notification) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status) {
        $state.go('posts', {user_id: data.user_id});
      } else {
        self.user = {};
        self.loginUser = function(){
          $homeService.user_session(self.user).then(function(data) {
            if(data.success){
              Notification.success("Signed in");
              $state.go('posts', {user_id: data.user_id});
            } else {
              Notification.warning("Please try again later");
            }
          });
        };
      }
    });
  }]
});
