app.service('updateExpenses', ['$http', function($http){
    
    return function (expense){

        return $http({
            method: 'PATCH',
            url: '/expenses/' + expense._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: expense
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

app.service('deleteExpense', ['$http', function($http){
    
    return function (expense){

        return $http({
            method: 'DELETE',
            url: '/espenses/' + expense._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: expense
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data);
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('addExspense', ['$http', function($http){
    
    return function (expense){
        return $http({
            method: 'POST',
            url: '/expenses/',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: expense
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data);
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('getExpensesByDate', ['$http', function($http){
    
    return function (date){
        return $http({
            method: 'POST',
            url: '/exspenses/byDate',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: {date: date}
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            console.log(response.data);
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);