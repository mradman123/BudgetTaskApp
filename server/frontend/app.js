var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages', 'datatables', 'datatables.bootstrap', 'ngMaterialDatePicker']);

//Check for token on url change
app.run(['$rootScope', '$location', '$http', function ($rootScope, $location, $http) {
  $rootScope.$on('$routeChangeStart', function (event) {

    if (JSON.parse(localStorage.getItem('token')) == null && $location.$$path != '/register') {
      //event.preventDefault();
      $location.path('/');
    }
    else {

    }
  });

  //$http.defaults.headers.common['x-auth'] = JSON.parse(localStorage.getItem('token'));
  
}]);

//Remove ! from url
app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

