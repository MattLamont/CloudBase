angular.module('sailng.header', ['ngMaterial'])

  .controller('HeaderCtrl', function HeaderController($scope, $state, $mdSidenav, config) {

    $scope.currentUser = config.currentUser;

    $scope.toggleSideNav = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    };
  });
