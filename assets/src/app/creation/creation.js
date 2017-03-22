angular.module('sailng.creation', ['ngMaterial', 'ngMessages', 'ngFileUpload'])

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

  .controller('CreationCtrl', function CreationController($scope, $sailsSocket, $window, $http, $mdConstant, config, titleService, RecipeModel, FlavorModel, Upload, $mdToast) {

    $scope.newRecipe = {
      "name": "",
      "description": "",
      "category": "",
      "cost": "",
      "currency": null,
      "additionalInfo": "",
      "images": [""],
      "targetNicotine": 6,
      "totalVolume": null,
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
      "nicotineStrength": 100,
      "pg": {
        "ml": null,
        "grams": null,
        "percent": 50
      },
      "vg": {
        "ml": null,
        "grams": null,
        "percent": 50
      }
    };

    $scope.newFlavor = {
      "name": "",
      "brand": "",
      "link": "",
      "tags": [],
      "description": ""
    };

    $scope.categories = [
      "Candy",
      "Beverage",
      "Cereal",
      "Dessert",
      "Menthol/Mint",
      "Tobacco",
      "Fruit",
      "Food"
    ];

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

      Upload.upload({
        url: '/api/recipe/image',
        data: {
          file: $scope.file
        }
      }).then(function(resp) {
          $scope.newRecipe.images[0] = resp.data.results.files[0].extra.Location;

          $http
            .post('/api/recipe', $scope.newRecipe)
            .then(function(data) {
              $scope.showSimpleToast('Recipe Successfully Created');
            });

        },
        function(resp) {
          $scope.showSimpleToast('Unable to save recipe image. Please try again.');
          console.log('Error status: ' + resp.status);
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

    $scope.updateRecipeValues = function() {
      console.log("changing");
      $scope.newRecipe.nicotine.grams = ($scope.newRecipe.targetNicotine * $scope.newRecipe.totalVolume) / 1000;
      $scope.newRecipe.nicotine.milliliters = $scope.newRecipe.nicotine.Grams / $scope.newRecipe.nicotineStrength * 1000;
      $scope.newRecipe.nicotine.percent = ($scope.newRecipe.nicotine.Milliliters / $scope.newRecipe.totalVolume) * 100;
      $scope.newRecipe.nicotine.drops = Math.round($scope.newRecipe.nicotine.Milliliters / 0.05);

      console.log($scope.newRecipe.nicotine);
    };

    $scope.createFlavor = function() {
      $http
        .post('/api/flavor', $scope.newFlavor)
        .then(function(data) {
          $scope.showSimpleToast('Successfully created flavor: ' + $scope.newFlavor.name);
          console.log(data);
        });
    };

    var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

    $scope.toastPosition = angular.extend({}, last);

    $scope.getToastPosition = function() {
      return Object.keys($scope.toastPosition)
        .filter(function(pos) {
          return $scope.toastPosition[pos];
        })
        .join(' ');
    };

    $scope.showSimpleToast = function(message) {
      var pinTo = $scope.getToastPosition();

      $mdToast.show(
        $mdToast.simple()
        .textContent(message)
        .position(pinTo)
        .hideDelay(10000)
      );
    };

  })
