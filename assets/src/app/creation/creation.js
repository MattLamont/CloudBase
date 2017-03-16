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
  .service('fileUpload', ['$http', function($http) {
    this.uploadFileToUrl = function(file, uploadUrl) {
      var fd = new FormData();
      fd.append('file', file);

      $http.post(uploadUrl, fd, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })

        .success(function() {})

        .error(function() {});
    }
  }])

  .controller('CreationCtrl', function CreationController($scope, $sailsSocket, $window, $http, $mdConstant, config, titleService, RecipeModel, FlavorModel, fileUpload, Upload) {

    $scope.newRecipe = {
      "name": "",
      "description": "",
      "category": "",
      "cost": "",
      "currency": null,
      "additionalInfo": "",
      "images": [],
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

      console.log( $scope.file );

      Upload.upload({
        url: '/api/recipe/image',
        data: {
          file: $scope.file,
          'username': $scope.username
        }
      }).then(function(resp) {
        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp);
        console.log( resp );
      }, function(resp) {
        console.log('Error status: ' + resp.status);
      });

      //var image_data = "{'file':"+$scope.file+",'filename':"}'
/*
      $http.post('/api/recipe/image', image_data).then(function(data) {
        console.log(data);
    });*/
      /*
      RecipeModel.create($scope.newRecipe).then(function(model) {
        console.log(model);
        $window.location.href = '/recipe/' + model.results.id;
      });
      */
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
      $scope.newRecipe.nicotine.Grams = ($scope.newRecipe.targetNicotine * $scope.newRecipe.totalVolume) / 1000;
      $scope.newRecipe.nicotine.Milliliters = $scope.newRecipe.nicotine.Grams / $scope.newRecipe.nicotineStrength * 1000;
      $scope.newRecipe.nicotine.Percent = ($scope.newRecipe.nicotine.Milliliters / $scope.newRecipe.totalVolume) * 100;
      $scope.newRecipe.nicotine.Drops = Math.round($scope.newRecipe.nicotine.Milliliters / 0.05);

      console.log($scope.newRecipe.nicotine);
    };

    $scope.createFlavor = function() {
      $http
        .post('/api/flavor', $scope.newFlavor)
        .then(function(data) {
          console.log(data);
        });
    };

    $scope.uploadFile = function() {
      var file = $scope.myFile;

      console.log('file is ');
      console.dir(file);

      var uploadUrl = "/fileUpload";
      fileUpload.uploadFileToUrl(file, uploadUrl);
    };

  })

  .directive('fileModel', ['$parse', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var model = $parse(attrs.fileModel);
        var modelSetter = model.assign;

        element.bind('change', function() {
          scope.$apply(function() {
            modelSetter(scope, element[0].files[0]);
          });
        });
      }
    };
  }]);
