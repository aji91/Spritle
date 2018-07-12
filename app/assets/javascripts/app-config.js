spritle.config(['NotificationProvider', function(NotificationProvider) {
  NotificationProvider.setOptions({
    delay: 4000,
    startTop: 20,
    startRight: 10,
    verticalSpacing: 20,
    horizontalSpacing: 20,
    positionX: 'right',
    positionY: 'top',
    replaceMessage: 'true',
    closeOnClick: 'true'
  });
}]);

spritle.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $httpProvider.defaults.cache = false;

  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }

  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('');
  $stateProvider
  .state('homes', {
    url: '/homes',
    template: '<homes></homes>'
  })
  .state('sign_up', {
    url: '/sign_up',
    template: '<sign-up></sign-up>'
  })
  .state('sign_in', {
    url: '/sign_in',
    template: '<sign-in></sign-in>'
  })
  .state('posts', {
    url: '/users/:user_id/posts',
    template: '<posts></posts>'
  });
  $urlRouterProvider.otherwise('homes');
}]);