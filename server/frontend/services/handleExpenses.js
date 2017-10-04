app.service('updateExpense', ['$http', function($http){
    
    return function (expense){

        return $http({
            method: 'PATCH',
            url: '/expenses/' + expense._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: expense
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));

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
            url: '/expenses/' + expense._id ,
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: expense
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));

            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('addExpense', ['$http', function($http){
    
    return function (expense){
        return $http({
            method: 'POST',
            url: '/expenses',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
            data: expense
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));

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

            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('getExpenses', ['$http', function($http){
    
    return function (date){
        return $http({
            method: 'GET',
            url: '/allExpenses',
            headers: {'x-auth': JSON.parse(localStorage.getItem('token'))},
        }).then(function successCallback(response) {
            //localStorage.setItem('tasks', JSON.stringify(response.data));
            return response.data;

        }, function errorCallback(response) {
            //$scope.showAlert = true;

        });
        
    };

}]);

app.service('getMonthlyExpenses', [ function(){
    
    return function(expenses, month, year) {
        
                let amount = 0;              

                let monthlyExpenses = [];

                for(var i=0; i < expenses.length; i++){

                    let m = moment(expenses[i].start).month() + 1;
                    let y = moment(expenses[i].start).year();
    
                    let mEnd = moment(expenses[i].end).month() + 1;
                    let yEnd = moment(expenses[i].end).year();                       
                    // if expense date matches requirements
                    if((m == month && y == year) || ((m <= month && y <= year) &&( mEnd >= month && yEnd >= year))){
                        amount += expenses[i].amount;
                        monthlyExpenses.push(expenses[i])
                    }
                        
                }

                let categories = ["Bills", "Food", "Entertainment", "Accommodation", "Transportation", "Memberships", "Debt", "Other"];
                let expensesArray = [];
                for(let i = 0; i < categories.length; i++){
                    expensesArray[i] = 0;
                    for(let j = 0; j < monthlyExpenses.length; j++){
                        if(categories[i] == monthlyExpenses[j].category){
                            expensesArray[i] = expensesArray[i] + monthlyExpenses[j].amount;
                        }
                    }
                }
                

                return {
                    expenses: expensesArray,
                    amount: amount
                };
        
            };

}]);


app.service('getYearlyExpenses', ['getMonthlyExpenses', function(getMonthlyExpenses){
    
    return function (expenses, year){
        let yearlyCategoryExpenses = [0,0,0,0,0,0,0,0];
        let amounts = [];
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let categories = ["Bills", "Food", "Entertainment", "Accommodation", "Transportation", "Memberships", "Debt", "Other"]
        for(let i = 0; i < 12; i++){
            let mExpenses = getMonthlyExpenses(expenses, i+1, year)
            amounts[i] = mExpenses.amount;
            for(let j = 0; j < categories.length; j++){
                yearlyCategoryExpenses[j] = yearlyCategoryExpenses[j] + mExpenses.expenses[j];
            }

        }
        return  {
            expenses: yearlyCategoryExpenses,
            amounts: amounts
        };
        
    };

}]);



