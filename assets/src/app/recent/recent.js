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

  .controller('RecentCtrl', function RecentController($scope, $sailsSocket, config, titleService, RecipeModel) {
    titleService.setTitle('Home');
    RecipeModel.getAll().then(function(model) {
      console.log(model);
      $scope.recipes = model.results;
    });
  });
