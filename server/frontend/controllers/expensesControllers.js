app.controller('expensesController', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', 'mdcDateTimeDialog', 'addExpense', 'updateExpense', 'deleteExpense', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, mdcDateTimeDialog, addExpense, updateExpense, deleteExpense) {
    
     /*    function completeTask(id) {
            let previous = {};
            angular.copy(vm.expenses[id], previous);
            vm.expenses[id].completed = !vm.expenses[id].completed;
            updateTask(vm.expenses[id]).then(function (data) {
                vm.dtInstance.reloadData();
            }).catch(function (e) {
                vm.expenses[id] = previous;
                vm.dtInstance.reloadData();
            });
    
        } */
    
        function removeExpense(id) {
            deleteExpense(vm.expenses[id]).then(function (data) {
                vm.dtInstance.reloadData();
            });
        }
    
        function edit(id) {
    
            vm.expenses[id].dateTime = moment(vm.expenses[id].dateTime, 'DD-MM-YYYY hh:mm a').toDate();
            $scope.new = false;
            $scope.expense = vm.expenses[id]
            $scope.selected = vm.expenses[id];
            // Edit some data and call server to make changes...
            // Then reload the data so that DT is refreshed
            vm.dtInstance.reloadData();
        }
        function deleteRow(expense) {
            // Delete some data and call server to make changes...
            // Then reload the data so that DT is refreshed
            //vm.dtInstance.reloadData();
        }
        function createdRow(row, data, dataIndex) {
            // Recompiling so we can bind Angular directive to the DT
            $compile(angular.element(row).contents())($scope);
        }
        function actionsHtml(data, type, full, meta) {
            vm.expenses[data.id] = data;
    
            //Style the button depending on expense completion
            let completedBtn;
    
            if (!data.completed) {
                completedBtn = '<button class="btn btn-edit" ng-click="expensesController.completeTask(' + data.id + ')">' +
                    '   <span class="glyphicon glyphicon-remove"></span>' +
                    '</button>&nbsp';
            }
            else {
                completedBtn = '<button class="btn btn-success" ng-click="expenses.completeTask(' + data.id + ')">' +
                    '   <span class="glyphicon glyphicon-ok"></span>' +
                    '</button>&nbsp';
            }
    
            return completedBtn +
                '<button class="btn btn-warning" ng-click="expensesController.edit(' + data.id + ')">' +
                '   <span class="glyphicon glyphicon-edit"></span>' +
                '</button>&nbsp;' +
                '<button class="btn btn-danger" ng-click="expensesController.removeTask(' + data.id + ')">' +
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
            $scope.expense = {
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
        vm.completeExpense = completeExpense;
        vm.removeExpense = removeExpense;
        vm.dtInstance = {};
        vm.expenses = [];
        vm.addNewExpense = addNewExpense;
    
        //expenses
        $scope.expense = {};
        $scope.new = true;
        $scope.selected = false;
        $scope.submitTaskForm = function (isValid) {
            
            //Check to submit new expense or update existing
            if($scope.new){
                addTask($scope.expense).then(function(response){
                    vm.dtInstance.reloadData();
                });
            }
            else{
                updateTask($scope.expense).then(function (data) {
                    vm.dtInstance.reloadData();
                }).catch(function (e) {
                    //vm.expenses[id] = previous;
                });
            }
            
        };
    
        //console.log(data.todos)
        vm.dtOptions = DTOptionsBuilder
            .newOptions().
            withOption('ajax', {
                dataType: "json",
                url: '/expenses',
                headers: { 'x-auth': JSON.parse(localStorage.getItem('token')) },
                dataSrc: function (data) {
    
                    let i = 0;
                    data.expenses = data.expenses.map(function(el){
                        el.dateTime = moment(el.dateTime).format('DD-MM-YYYY hh:mm a');
                        el.id = i;
                        i++;
                        return el;
                    });
                    return data.expenses;
                }
            })
            .withPaginationType('full_numbers')
            .withOption('createdRow', createdRow);
    
        vm.dtColumns = [
            DTColumnBuilder.newColumn('text').withTitle('expense'),
            DTColumnBuilder.newColumn('dateTime').withTitle('Date and time'),
            DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
                .renderWith(actionsHtml)
        ];
    
    
    
        //Date picker
        this.myDate = new Date();
        vm.isOpen = false;
    
    
    }]);