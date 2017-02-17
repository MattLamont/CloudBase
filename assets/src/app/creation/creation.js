angular.module( 'sailng.creation', ['ui.bootstrap'])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'creation', {
		url: '/creation',
		views: {
			"main": {
				controller: 'CreationCtrl',
				templateUrl: 'creation/creation.tpl.html'
			}
		}
	});
})

.controller( 'CreationCtrl', function CreationController( $scope, $sailsSocket, $window , config, titleService, RecipeModel , FlavorModel ) {

	$scope.newRecipe = {
												"name":"",
												"description":"",
												"cost":"",
												"currency":"",
												"flavors":[{
													"name":"",
													"ml":"",
													"grams":"",
													"percentage":""
												}],
												"tags":[],
												"nicotine":{
													"ml":"",
													"grams":"",
													"percent":""
												},
												"pg":{
													"ml":"",
													"grams":"",
													"percent":""
												},
												"vg":{
													"ml":"",
													"grams":"",
													"percent":""
												}
											};

	$scope.currentUser = config.currentUser;
	$scope.tag_value = "";

	$scope.createRecipe = function() {

		$scope.newRecipe.author = $scope.currentUser.username;

		RecipeModel.create( $scope.newRecipe ).then( function( model ){
			console.log( model );
			$window.location.href = '/recipe/' + model.results.id;
		});

	};

	$scope.search = function( search_value ) {

		return FlavorModel.search( search_value ).then(function(response){
			return response.results;
    });
	};

	$scope.addFlavorLine = function(){

		$scope.newRecipe.flavors.push( {
			"name":"",
			"id":"",
			"ml":"",
			"grams":"",
			"percent":""
		});
	};

	$scope.removeFlavorLine = function( index ){

		$scope.newRecipe.flavors.splice( index , 1 );
	};

	$scope.addTag = function(){
		if( $scope.tag_value.length < 2 ){
			return;
		}

		function checkDuplicate( tag ){
			return tag === $scope.tag_value;
		}

		if( $scope.newRecipe.tags.find( checkDuplicate ) ){
			$scope.tag_value = "";
			return;
		}

		$scope.newRecipe.tags.push( $scope.tag_value );
		$scope.tag_value = "";
	};

	$scope.removeTag = function( index ){
		$scope.newRecipe.tags.splice( index , 1 );
	};

	$scope.flavorSelected = function( item , index ){
		$scope.newRecipe.flavors[index].id = item.id;
		$scope.newRecipe.flavors[index].name = item.name;
	}

});
