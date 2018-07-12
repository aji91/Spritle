angular.module('posts')
.factory('Posts', ['$resource',function($resource) {
  return {
    collection: $resource('/api/v1/users/:user_id/posts', {}, {
      query: { method: 'GET' },
      create: { method: 'POST', params: {user_id: '@user_id'} }
    }),
    member: $resource('/api/v1/users/:user_id/posts/:id', {}, {
      query: { method: 'GET' }
    })
  };
}]);
