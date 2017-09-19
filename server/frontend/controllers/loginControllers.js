app.controller('loginController', ['$scope', '$http', '$location', 'userStorage', function ($scope, $http, $location, userStorage) {
    $scope.email = '';
    $scope.password = '';
    $scope.showAlert = false;
    $scope.submitLoginForm = function (isValid) {
        $http({
            method: 'POST',
            url: '/users/login',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function successCallback(response) {

            userStorage.storeUser({
                user: response.data,
                token: response.headers('x-auth')
            });

            $location.path('/home')

        }, function errorCallback(response) {
            $scope.showAlert = true;
        });
    };
}]);

app.controller('registerController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.email = '';
    $scope.password = '';
    $scope.rPassword = '';
    $scope.showAlert = false;
    $scope.submitRegisterForm = function (isValid) {
        $http({
            method: 'POST',
            url: '/users',
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function successCallback(response) {
           
            userStorage.storeUser({
                user: response.data,
                token: response.headers('x-auth')
            });
            
            $location.path('/home')

        }, function errorCallback(response) {          
            $scope.showAlert = true;
        });
    };
}]);

app.controller('logoutController', ['$location', '$http', function($location, $http){
    
    //$location.path('/home');
    $http({
        method: 'DELETE',
        url: '/users/me/token',
        headers: {'x-auth': JSON.parse(localStorage.getItem('token'))}
    }).then(function successCallback(response) {
        localStorage.clear();
        $location.path('/home')
        
    }, function errorCallback(response) {          
        
    });
    

}]);