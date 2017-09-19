app.service('updateTask', ['$http', function($http){
    
    return function (task){

        return $http({
            method: 'PATCH',
            url: '/todos/' + task._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: task
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data);
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;
            throw response;
        });
        
    };

}]);

app.service('deleteTask', ['$http', function($http){
    
    return function (task){

        return $http({
            method: 'DELETE',
            url: '/todos/' + task._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: task
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data);
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('addTask', ['$http', function($http){
    
    return function (task){
        return $http({
            method: 'POST',
            url: '/todos/',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: task
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data);
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);