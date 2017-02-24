angular.module( 'sailng.recipe', ['ngMaterial'])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'recipe', {
		url: '/recipe/:id',
		views: {
			"main": {
				controller: 'RecipeCtrl',
				templateUrl: 'recipe/recipe.tpl.html'
			}
		}
	});
})

.controller( 'RecipeCtrl', function CreationController( $scope, $sailsSocket, $stateParams , config, titleService, RecipeModel , FlavorModel ) {

  $scope.recipe = {};

  console.log( "getting recipe");
  RecipeModel.getOne( $stateParams.id ).then( function( data ){
    console.log( data );
    $scope.recipe = data.results[0];
  });
});
