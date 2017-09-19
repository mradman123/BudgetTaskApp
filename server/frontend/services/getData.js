app.service('getData', ['$http', function($http){
    
    return function (){

        return $http({
            method: 'GET',
            url: '/todos',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))}
        }).then(function successCallback(response) {
            localStorage.setItem('tasks', JSON.stringify(response.data));
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };


}]);