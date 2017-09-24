var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngMessages', 'datatables', 'datatables.bootstrap', 'ngMaterialDatePicker', 'chart.js']);

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

  $rootScope.$on('$routeChangeSuccess', function(ev,data) {   
    if ($location.$$path == '/register' || $location.$$path == '/'){
      $rootScope.bodyBackground = true;
    }else{
      $rootScope.bodyBackground = false;
    }
      
  })
  //$http.defaults.headers.common['x-auth'] = JSON.parse(localStorage.getItem('token'));
  
}]);

//Set global chart colors
app.config(function(ChartJsProvider) {
  ChartJsProvider.setOptions({ chartColors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
  })

//Remove ! from url
app.config(['$locationProvider', function ($locationProvider) {
  $locationProvider.hashPrefix('');
}]);
//Remove aria provider warnings
app.config(['$mdAriaProvider', function ($mdAriaProvider) {
  $mdAriaProvider.disableWarnings();
}])

