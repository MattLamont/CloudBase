angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config ) {
    $scope.currentUser = config.currentUser;

    var navItems = [
        {title: 'Creation', translationKey: 'navigation:creation', url: '/creation', cssClass: 'fa fa-comments'},
        {title: 'Popular', translationKey: 'navigation:popular', url:'/popular',cssClass: 'fa fa-info-circle'},
        {title: 'Recent', translationKey: 'navigation:recent', url:'/recent',cssClass: 'fa fa-info-circle'},
    ];

    if (!$scope.currentUser) {
        navItems.push({title: 'Register', translationKey: 'navigation:register', url: '/register', cssClass: 'fa fa-briefcase'});
        navItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', cssClass: 'fa fa-sign-in'});
    }

    $scope.navItems = navItems;
});
