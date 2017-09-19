app.controller('tasksController', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', 'mdcDateTimeDialog', 'getData', 'addTask', 'updateTask', 'deleteTask', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, mdcDateTimeDialog, getData, addTask, updateTask, deleteTask) {

    function completeTask(id) {
        let previous = {};
        angular.copy(vm.tasks[id], previous);
        vm.tasks[id].completed = !vm.tasks[id].completed;
        updateTask(vm.tasks[id]).then(function (data) {
            vm.dtInstance.reloadData();
        }).catch(function (e) {
            vm.tasks[id] = previous;
        });

    }

    function removeTask(id) {
        console.log(id);
        deleteTask(vm.tasks[id]).then(function (data) {
            vm.dtInstance.reloadData();
        });
    }

    function edit(task) {

        vm.tasks[task].dateTime = moment(vm.tasks[task].dateTime, 'DD-MM-YYYY hh:mm a').toDate();
        $scope.new = false;
        $scope.task = vm.tasks[task]
        $scope.selected = vm.tasks[task];
        vm.message = 'You are trying to edit the row: ' + JSON.stringify(vm.tasks[task]._id);
        // Edit some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        vm.dtInstance.reloadData();
    }
    function deleteRow(task) {
        vm.message = 'You are trying to remove the row: ' + JSON.stringify(vm.tasks[task]._id);
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

        //Style of button dependent on task completion
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
   
        if($scope.new){
            addTask($scope.task).then(function(response){
                console.log(response)
                vm.dtInstance.reloadData();
            });
        }
        else{
            updateTask($scope.task).then(function (data) {
                vm.dtInstance.reloadData();
            }).catch(function (e) {
                //vm.tasks[id] = previous;
            });
        }
        
    };

    //console.log(data.todos)
    vm.dtOptions = DTOptionsBuilder
        .newOptions().
        withOption('ajax', {
            dataType: "json",
            url: '/todos',
            headers: { 'x-auth': JSON.parse(localStorage.getItem('token')) },
            dataSrc: function (d) {

                /* for (let i = 0; i < d.todos.length; i++) {
                    d.todos[i].id = i;
                    d.todos[i]
                } */
                let i = 0;
                d.todos = d.todos.map(function(el){
                    el.dateTime = moment(el.dateTime).format('DD-MM-YYYY hh:mm a');
                    el.id = i;
                    i++;
                    return el;
                });
                console.log(d.todos[0])
                return d.todos;
            }
        })
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow);
    vm.dtColumns = [
        DTColumnBuilder.newColumn('text').withTitle('Task'),
        DTColumnBuilder.newColumn('dateTime').withTitle('Date and time'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
    ];



    //Date picker
    this.myDate = new Date();
    vm.isOpen = false;


    /* $scope.displayDialog = function () {
        mdcDateTimeDialog.show({
            maxDate: $scope.maxDate,
            time: false
        })
            .then(function (date) {
                $scope.selectedDateTime = date;
                console.log('New Date / Time selected:', date);
            }, function () {
                console.log('Selection canceled');
            });
    }; */

}]);