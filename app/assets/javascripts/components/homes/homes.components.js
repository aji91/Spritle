angular.module('homes', ['ngResource','ngStorage']);
angular.module('homes')
.component('homes', {
  templateUrl: '/templates/homes/home.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', function HomesController($http, $stateParams, $state, $localStorage, $homeService) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status){
        $state.go('posts', {user_id: data.user_id});
      }
  	});
  }]
});
