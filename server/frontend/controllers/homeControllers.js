app.controller('homeController', ['$scope', 'updateTask', 'getTasksByDate', 'getExpenses', 'getMonthlyExpenses', 'getYearlyExpenses', function ($scope, updateTask, getTasksByDate, getExpenses, getMonthlyExpenses, getYearlyExpenses) {
    var today = new Date();
    var tomorrow = new Date();
    var yesterday = new Date();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    tomorrow.setDate(today.getDate()+1);
    yesterday.setDate(today.getDate()-1);


    $scope.completeTask = function(task){

        updateTask(task).then(function (data) {

        }).catch(function (e) {
           
        });
        
    };

    getTasksByDate(today).then((response) => {

        $scope.todaysTasks = response;


    });

    getTasksByDate(tomorrow).then((response) => {

        $scope.tomorrowsTasks = response;
 
    });

    getTasksByDate(yesterday).then((response) => {
        
       $scope.yesterdaysTasks = response;
         
    });

    getExpenses(today).then((response) => {


        var currentMonthlyExpenses = getMonthlyExpenses(response.expenses, month, year);
        var monthlyExpenses = currentMonthlyExpenses.expenses;
        $scope.monthlyAmount = currentMonthlyExpenses.amount;
        $scope.monthlyChartLabels = ["Bills", "Food", "Entertainment", "Accommodation", "Transportation", "Memberships", "Debt", "Other"];
        $scope.monthlyChartData = currentMonthlyExpenses.expenses;

        $scope.yearlyChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var currentYearlyExpenses = getYearlyExpenses(response.expenses, year);
        $scope.yearlyChartData = currentYearlyExpenses.amounts;

        $scope.yearlyCategoryChartData = currentYearlyExpenses.expenses;

    });


    

  


}]);