app.directive('taskForm', function(){
    return {
        templateUrl: './directives/taskForm.html',
        replace: true
    }
});

app.directive('tasksList', function(){
    return {
        templateUrl: './directives/tasksList.html',
        replace: true,
        scope: {
            tasks: '=',
            completeTask: '&' 
        }
    }
});