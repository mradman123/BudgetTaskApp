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

        .otherwise({ redirectTo: '/' });
});