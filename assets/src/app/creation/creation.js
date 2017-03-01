angular.module('sailng.creation', ['ngMaterial' , 'ngMessages'])

  .config(function config($stateProvider) {
    $stateProvider.state('creation', {
      url: '/creation',
      views: {
        "main": {
          controller: 'CreationCtrl',
          templateUrl: 'creation/creation.tpl.html'
        }
      }
    });
  })

  .controller('CreationCtrl', function CreationController($scope, $sailsSocket, $window, $http, $mdConstant, config, titleService, RecipeModel, FlavorModel) {

    $scope.newRecipe = {
      "name": "",
      "description": "",
      "cost": "",
      "currency": "",
      "flavors": [{
        "name": "",
        "ml": "",
        "grams": "",
        "percentage": ""
      }],
      "tags": [],
      "nicotine": {
        "milliliters": null,
        "grams": null,
        "percent": null,
        "drops": null
      },
      "nicotineStrength":100,
      "pg": {
        "ml": "",
        "grams": "",
        "percent": ""
      },
      "vg": {
        "ml": "",
        "grams": "",
        "percent": ""
      }
    };

    $scope.currentUser = config.currentUser;

    $scope.searchText = "";

    $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

    $scope.fabToolbarOpen = false;

    $scope.currentUnitType = "Percent";

    $scope.pg_weight = 1.036;
    $scope.vg_weight = 1.261;


    $scope.querySearch = function(query) {
      return $http
        .get('/api/flavor/search/?q=' + query)
        .then(function(data) {
          return data.data.results;
        });
    };

    $scope.selectedFlavorChange = function(item, index) {
      $scope.newRecipe.flavors[index].name = item.name;
      $scope.newRecipe.flavors[index].id = item.id;
    };

    $scope.createRecipe = function() {

      $scope.newRecipe.author = $scope.currentUser.username;

      RecipeModel.create($scope.newRecipe).then(function(model) {
        console.log(model);
        $window.location.href = '/recipe/' + model.results.id;
      });

    };

    $scope.addFlavorLine = function() {

      $scope.newRecipe.flavors.push({
        "name": "",
        "id": "",
        "ml": "",
        "grams": "",
        "percent": ""
      });
    };

    $scope.removeFlavorLine = function(index) {

      $scope.newRecipe.flavors.splice(index, 1);
    };

    $scope.currencies = ('USD GBP').split(' ').map(function(currency) {
      return {
        name: currency
      };
    });

    $scope.changeUnitType = function(type) {
      $scope.currentUnitType = type;
    };

    $scope.updateRecipeValues = function(){
        console.log( "changing");
        $scope.newRecipe.nicotine.Grams = ($scope.newRecipe.targetNicotine * $scope.newRecipe.totalVolume) / 1000;
        $scope.newRecipe.nicotine.Milliliters = $scope.newRecipe.nicotine.Grams / $scope.newRecipe.nicotineStrength;
        $scope.newRecipe.nicotine.Percent = ($scope.newRecipe.nicotine.Milliliters / $scope.newRecipe.totalVolume) * 100;
        $scope.newRecipe.nicotine.Drops = Math.round( $scope.newRecipe.nicotine.Milliliters / 0.05 );

        console.log( $scope.newRecipe.nicotine );
    };

  });
