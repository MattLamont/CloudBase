angular.module('sailng.recipeContainer', ['ngMaterial'])

  .controller('RecipeContainerCtrl', function RecipeContainerController($scope, $state, config, $http) {

    $scope.currentUser = config.currentUser;

    $http.get( '/api/recipes/recent' ).then( function( res ){
        $scope.recipes = res.data.results;
        console.log( $scope.recipes );
    });

  });
