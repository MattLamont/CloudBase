angular.module('sailng.recent', [])

  .config(function config($stateProvider) {
    $stateProvider.state('recent', {
      url: '/recent',
      views: {
        "main": {
          controller: 'RecentCtrl',
          templateUrl: 'recent/recent.tpl.html'
        }
      }
    });
  })

  .controller('RecentCtrl', function RecentController($scope, $sailsSocket, $http, config, titleService, RecipeModel) {
    titleService.setTitle('Home');

  });
