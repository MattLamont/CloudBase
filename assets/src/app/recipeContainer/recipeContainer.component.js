angular.module('sailng.recipeContainer', ['ngMaterial'])

  .controller('RecipeContainerCtrl', function RecipeContainerController($scope, $state, config, $http, $mdDialog) {

    $scope.currentUser = config.currentUser;

    $scope.recipe_display = false;
    $scope.displayedRecipe = {};

    $http.get('/api/recipes/recent').then(function(res) {
      $scope.recipes = res.data.results;
    });

    $scope.onCardClick = function(index) {
      $scope.displayedRecipe = $scope.recipes[index];
      $scope.recipe_display = true;
    };

    $scope.closeRecipeDisplay = function() {
      $scope.recipe_display = false;
    };

    $scope.showRecipeDialog = function(ev, selected_recipe) {
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
