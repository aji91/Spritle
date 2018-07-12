angular.module('posts', ['ngResource','ngStorage']);
angular.module('posts')
.component('posts', {
  templateUrl: '/templates/posts/index.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'Notification', 'Posts', 'Faye', function SignupController($http, $stateParams, $state, $localStorage, $homeService, Notification, Posts, Faye) {
    var self = this;
    $homeService.check_current_user().then(function(data) {
      if (data.status){
        self.user_id = data.user_id;
        self.post = {
          user_id: self.user_id
        }
        Faye.subscribe("/post-channel-1", function(msg) {
          Posts.member.query({user_id: self.user_id, id: msg.post_id}).$promise.then(function (response) {
            self.posts.splice(0,0, response.data);
          });
        });
        Posts.collection.query({user_id: self.user_id}).$promise.then(function (response) {
          self.posts = response.data;
        });

        self.createPost = function(){
          if (self.post.description == ''){
            Notification.warning('Please write something');
          } else {
            Posts.collection.create(self.post).$promise.then(function (response) {
              Faye.publish("/post-channel-1", {post_id: response.data.id});
            });
          }
        };
      } else {
        $state.go('sign_in')
      }
    });
  }]
});
