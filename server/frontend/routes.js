app.config(function ($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: './views/login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: './views/register.html',
            controller: 'registerController'
        })
        .when('/logout', {
            templateUrl: '',
            controller: 'logoutController'    
        })
        .when('/home', {
            templateUrl: './views/home.html',
            controller: 'homeController'
        })
        .when('/tasks', {
            templateUrl: './views/tasks.html',
            controller: 'tasksController',
            controllerAs: 'tasksController'
        })
        .when('/expenses', {
            templateUrl: './views/expenses.html',
            controller: 'expensesController',
            controllerAs: 'expensesController'
        })
        .when('/recurringExpenses', {
            templateUrl: './views/recurringExpenses.html',
            controller: 'rExpensesController',
            controllerAs: 'rExpensesController'
        })


        .otherwise({ redirectTo: '/' });
});