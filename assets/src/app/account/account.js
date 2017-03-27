angular.module('sailng.account', ['ngFileUpload'])

  .config(function config($stateProvider) {
    $stateProvider.state('account', {
      url: '/account',
      views: {
        "main": {
          controller: 'AccountCtrl',
          templateUrl: 'account/account.tpl.html'
        }
      }
    });
  })

  .controller('AccountCtrl', function AccountController($scope, $sailsSocket, $http, config, $mdToast , Upload) {

    var user_id = config.currentUser.id;
    var url = '/api/user/' + user_id;

    $http.get(url).then(function(res) {
      $scope.user = res.data.results;
    });

    $scope.onAccept = function() {
      Upload.upload({
        url: '/api/user/image',
        data: {
          file: $scope.file
        }
      }).then(function(resp) {
          $scope.user.image = resp.data.results.files[0].extra.Location;

          $http
            .put( url , $scope.user)
            .then(function(data) {
              $scope.showSimpleToast('User Image Successfully Changed');
            });
        },
        function(resp) {
          $scope.showSimpleToast('Unable to save recipe image. Please try again.');
          console.log('Error status: ' + resp.status);
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



  });
