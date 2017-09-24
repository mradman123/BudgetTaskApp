app.controller('tasksController', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', 'mdcDateTimeDialog', 'addTask', 'updateTask', 'deleteTask', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, mdcDateTimeDialog, addTask, updateTask, deleteTask) {

    function completeTask(id) {
        vm.tasks[id].completed = !vm.tasks[id].completed;
        vm.tasks[id].dateTime = moment(vm.tasks[id].dateTime, 'DD-MM-YYYY hh:mm a').toDate();
        updateTask(vm.tasks[id]).then(function (data) {
            vm.dtInstance.reloadData();
        }).catch(function (e) {
            //vm.tasks[id] = previous;
            vm.dtInstance.reloadData();
        });

    }

    function removeTask(id) {
        deleteTask(vm.tasks[id]).then(function (data) {
            vm.dtInstance.reloadData();
            $scope.task = {};
        });
    }

    function edit(id) {

        vm.tasks[id].dateTime = moment(vm.tasks[id].dateTime, 'DD-MM-YYYY hh:mm a').toDate();
        $scope.new = false;
        $scope.task = vm.tasks[id]
        $scope.selected = vm.tasks[id];
        // Edit some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        vm.dtInstance.reloadData();
    }
    function deleteRow(task) {
        // Delete some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        //vm.dtInstance.reloadData();
    }
    function createdRow(row, data, dataIndex) {
        // Recompiling so we can bind Angular directive to the DT
        $compile(angular.element(row).contents())($scope);
    }
    function actionsHtml(data, type, full, meta) {
        vm.tasks[data.id] = data;

        //Style the button depending on task completion
        let completedBtn;

        if (!data.completed) {
            completedBtn = '<button class="btn btn-edit" ng-click="tasksController.completeTask(' + data.id + ')">' +
                '   <span class="glyphicon glyphicon-remove"></span>' +
                '</button>&nbsp';
        }
        else {
            completedBtn = '<button class="btn btn-success" ng-click="tasksController.completeTask(' + data.id + ')">' +
                '   <span class="glyphicon glyphicon-ok"></span>' +
                '</button>&nbsp';
        }

        return completedBtn +
            '<button class="btn btn-warning" ng-click="tasksController.edit(' + data.id + ')">' +
            '   <span class="glyphicon glyphicon-edit"></span>' +
            '</button>&nbsp;' +
            '<button class="btn btn-danger" ng-click="tasksController.removeTask(' + data.id + ')">' +
            '   <span class="glyphicon glyphicon-trash"></i>' +
            '</button>';
    }

    function reloadData() {
        var resetPaging = false;
        vm.dtInstance.reloadData(callback, resetPaging);
    }

    function callback(json) {
        console.log(json);
    }

    function addNewTask(){
        $scope.task = {
            dateTime: new Date()
        }
        $scope.selected = true;
        $scope.new = true;
    }

    //Datatables
    var vm = this;
    vm.message = '';
    vm.edit = edit;
    vm.delete = deleteRow;
    vm.reloadData = reloadData;
    vm.completeTask = completeTask;
    vm.removeTask = removeTask;
    vm.dtInstance = {};
    vm.tasks = [];
    vm.addNewTask = addNewTask;

    //Tasks
    $scope.task = {};
    $scope.new = true;
    $scope.selected = false;
    $scope.submitTaskForm = function (isValid) {
        
        //Check to submit new task or update existing
        if($scope.new){
            addTask($scope.task).then(function(response){
                vm.dtInstance.reloadData();
            }).catch(function (e) {
                console.log(e)
            });
        }
        else{
            updateTask($scope.task).then(function (data) {
                vm.dtInstance.reloadData();
            }).catch(function (e) {
                console.log(e)
            });
        }
        
    };

    //console.log(data.todos)
    vm.dtOptions = DTOptionsBuilder
        .newOptions().
        withOption('ajax', {
            dataType: "json",
            url: '/tasks',
            headers: { 'x-auth': JSON.parse(localStorage.getItem('token')) },
            dataSrc: function (data) {

                let i = 0;
                data.tasks = data.tasks.map(function(el){
                    el.dateTime = moment(el.dateTime).format('DD-MM-YYYY hh:mm a');
                    el.id = i;
                    i++;
                    return el;
                });
                return data.tasks;
            }
        })
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow)
        .withBootstrap();

    vm.dtColumns = [
        DTColumnBuilder.newColumn('text').withTitle('Task'),
        DTColumnBuilder.newColumn('dateTime').withTitle('Date and time'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
    ];



    //Date picker
    this.myDate = new Date();
    vm.isOpen = false;


    vm.newReload = function() {
        vm.dtOptions = DTOptionsBuilder
        .newOptions().
        withOption('ajax', {
            dataType: 'json',
            type: 'POST',
            url: '/tasks/ByDate',
            data: {date: Date.now},
            headers: { 'x-auth': JSON.parse(localStorage.getItem('token')) },
            dataSrc: function (data) {

                let i = 0;
                data.tasks = data.tasks.map(function(el){
                    el.dateTime = moment(el.dateTime).format('DD-MM-YYYY hh:mm a');
                    el.id = i;
                    i++;
                    return el;
                });
                return data.tasks;
            }
        })

        vm.dtInstance.reloadData();
    }


}]);