angular.module('signUp', ['ngResource','ngStorage']);
angular.module('signUp')
.component('signUp', {
  templateUrl: '/templates/sign_up/index.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'Notification', 'Upload', function SignupController($http, $stateParams, $state, $localStorage, $homeService, Notification, Upload) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status){
        $state.go('posts', {user_id: data.user_id})
      } else {
        self.user = {};
        self.registerUser = function(new_user, profile_photo){
          if (profile_photo != undefined){
            new_user.$setPristine();
            $homeService.user_registration(self.user).then(function(data) {
              if(data.success){
                profile_photo.upload = Upload.upload({
                  url: '/api/v1/users/'+data.user_id+'/upload_profile_image',
                  method: 'put',
                  data: { user: { profile_image: profile_photo } }
                });
                Notification.success("Account successfully created");
                $state.go('posts', {user_id: data.user_id});
              } else {
                Notification.success("Account not created");
              }
            });
          } else {
            Notification.warning('Please upload image');
          }
        };
      }
    });
  }]
});
