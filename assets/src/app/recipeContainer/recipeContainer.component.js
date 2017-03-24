angular.module('sailng.recipeContainer', ['ngMaterial']).component('recipeContainer', {
    templateUrl: 'src/app/recipeContainer/recipeContainer.tpl.html',
    controllerAs: "model",
    bindings: {
      url: '@'
    }
  })

  .controller('RecipeContainerCtrl', function RecipeContainerController($scope, $state, config, $http, $mdDialog) {

    $scope.currentUser = config.currentUser;

    $scope.url = $scope.model.url;

    $http.get($scope.url).then(function(res) {
      $scope.recipes = res.data.results;
    });

    $scope.likeRecipe = function(index, recipe) {
      var url = '/api/recipe/' + recipe.id;
      var likes = recipe.likes + 1;
      var body = '{"likes":' + likes + '}';
      $http.put(url, body).then(function(res) {
        $scope.recipes[index].likes = res.data.results[0].likes;
      });
    };

    $scope.dislikeRecipe = function(index, recipe) {
      var url = '/api/recipe/' + recipe.id;
      var dislikes = recipe.dislikes + 1;
      var body = '{"dislikes":' + dislikes + '}';
      $http.put(url, body).then(function(res) {
        $scope.recipes[index].dislikes = res.data.results[0].dislikes;
      });
    };

    $scope.increaseRecipeViews = function(recipe) {
      var url = '/api/recipe/' + recipe.id;
      var views = recipe.views + 1;
      var body = '{"views":' + views + '}';
      $http.put(url, body).then(function(res) {
          
      });
    };


    $scope.showRecipeDialog = function(ev, selected_recipe) {
      $scope.increaseRecipeViews(selected_recipe);

      $mdDialog.show({
          locals: {
            recipe: selected_recipe
          },
          controller: DialogController,
          templateUrl: 'src/app/recipeContainer/recipeDialog.tpl.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: true // Only for -xs, -sm breakpoints.
        })
        .then(function() {

        }, function() {

        });
    };

    function DialogController($scope, $mdDialog, recipe) {
      $scope.recipe = recipe;

      $scope.hide = function() {
        $mdDialog.hide();
      };

      $scope.cancel = function() {
        $mdDialog.cancel();
      };
    }

  });
