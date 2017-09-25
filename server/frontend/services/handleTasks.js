app.service('updateTask', ['$http', function($http){
    
    return function (task){

        return $http({
            method: 'PATCH',
            url: '/tasks/' + task._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: task
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));

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
            url: '/tasks/' + task._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: task
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
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
            url: '/tasks/',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: task
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));

            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('getTasksByDate', ['$http', function($http){
    
    return function (date){
        return $http({
            method: 'POST',
            url: '/tasks/byDate',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: {date: date}
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data.tasks)
            return response.data.tasks.map(function(el){
                el.time = moment(el.dateTime).format('hh:mm a');
                return el;
            });

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);