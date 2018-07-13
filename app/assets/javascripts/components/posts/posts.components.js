angular.module('posts', ['ngResource','ngStorage']);
angular.module('posts')
.component('posts', {
  templateUrl: '/templates/posts/index.html',
  controller: ['$http', '$stateParams', '$state','$localStorage', 'homeService', 'Notification', 'Posts', 'Faye', 'Likes', '$filter', '$scope', function SignupController($http, $stateParams, $state, $localStorage, $homeService, Notification, Posts, Faye, Likes, $filter, $scope) {
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

        Faye.subscribe("/like-channel-1", function(msg) {
          var post = $filter('filter')(self.posts, function (item) {
            return item.id == msg.post_id
          });
          $scope.$apply(function(){
            post[0].likes_count = msg.count;
          });
        });

        Faye.subscribe("/comment-channel-1", function(msg) {
          
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

        self.likeOrUnlike = function(post){
          if (post.can_like){
            var like = {
              user_id: self.user_id,
              post_id: post.id
            };

            if (post.liked){
              like.id = post.my_like;
              Likes.member.destroy(like).$promise.then(function (response) {
                if (response.success){
                  Faye.publish("/like-channel-1", {post_id: post.id, count: post.likes_count-1});
                  post.liked = false;
                  post.my_like = null;
                } else {
                  Notification.warning('Please try again later');
                }
              });
            } else {
              Likes.collection.create(like).$promise.then(function (response) {
                if (response.success){
                  Faye.publish("/like-channel-1", {post_id: post.id, count: post.likes_count+1});
                  post.liked = true;
                  post.my_like = response.data.id;
                } else {
                  Notification.warning('Please try again later');
                }
              });
            }
          }
        }
      } else {
        $state.go('sign_in')
      }
    });
  }]
});
