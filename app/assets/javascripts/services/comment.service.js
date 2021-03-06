angular.module('posts')
.factory('Comments', ['$resource',function($resource) {
  return {
    collection: $resource('/api/v1/users/:user_id/posts/:post_id/comments', {}, {
      query: { method: 'GET' },
      create: { method: 'POST', params: {user_id: '@user_id', post_id: '@post_id'} }
    }),
    member: $resource('/api/v1/users/:user_id/posts/:post_id/comments/:id', {}, {
      query: { method: 'GET' }
    })
  };
}]);
