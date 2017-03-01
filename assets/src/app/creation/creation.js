angular.module('sailng.creation', ['ngMaterial'])

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
        "Milliliters": "",
        "Grams": "",
        "Percent": "",
        "Drops":""
      },
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

    $scope.nicotineGetterSetter = function(value) {

      if (arguments.length != 0) {
        $scope.newRecipe.nicotine[$scope.currentUnitType] = value;
      } else {
        return $scope.newRecipe.nicotine[$scope.currentUnitType];
      }
    };

    $scope.vgGetterSetter = function(value) {
        if (arguments.length != 0) {
          $scope.newRecipe.vg[$scope.currentUnitType] = value;
        } else {
          return $scope.newRecipe.vg[$scope.currentUnitType];
        }
    };

    $scope.pgGetterSetter = function(value) {
        if (arguments.length != 0) {
          $scope.newRecipe.pg[$scope.currentUnitType] = value;
        } else {
          return $scope.newRecipe.pg[$scope.currentUnitType];
        }
    };

    $scope.changeUnitType = function(type) {
      $scope.currentUnitType = type;
      $scope.$apply();
    };

  });
