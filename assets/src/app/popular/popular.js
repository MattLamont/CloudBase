angular.module('sailng.popular', [])

  .config(function config($stateProvider) {
    $stateProvider.state('popular', {
      url: '/popular',
      views: {
        "main": {
          controller: 'PopularCtrl',
          templateUrl: 'popular/popular.tpl.html'
        }
      }
    });
  })

  .controller('PopularCtrl', function RecentController($scope, $sailsSocket, $http, config, titleService, RecipeModel) {
    titleService.setTitle('Home');

  });
