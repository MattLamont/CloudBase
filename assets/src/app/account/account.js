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

              $mdToast.show(
                $mdToast.simple()
                .textContent('User Image Successfully Changed')
                .position('top right')
                .hideDelay(10000)
              );
            });
        },
        function(resp) {

          $mdToast.show(
            $mdToast.simple()
            .textContent('Unable to save user image. Please try again.')
            .position('top right')
            .hideDelay(10000)
          );
          console.log('Error status: ' + resp.status);
        });
    };

  });
