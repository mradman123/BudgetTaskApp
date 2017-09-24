app.controller('rExpensesController', ['$scope', '$compile', 'DTOptionsBuilder', 'DTColumnBuilder', 'mdcDateTimeDialog', 'addExpense', 'updateExpense', 'deleteExpense', function ($scope, $compile, DTOptionsBuilder, DTColumnBuilder, mdcDateTimeDialog, addExpense, updateExpense, deleteExpense) {


    function removeExpense(id) {

        deleteExpense(vm.expenses[id]).then(function (data) {
            vm.dtInstance.reloadData();
        });
    }

    function edit(id) {
        vm.expenses[id].start = moment(vm.expenses[id].start, 'DD-MM-YYYY').toDate();
        vm.expenses[id].end = moment(vm.expenses[id].end, 'DD-MM-YYYY').toDate();
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

        return '<button class="btn btn-warning" ng-click="rExpensesController.edit(' + data.id + ')">' +
            '   <span class="glyphicon glyphicon-edit"></span>' +
            '</button>&nbsp;' +
            '<button class="btn btn-danger" ng-click="rExpensesController.removeExpense(' + data.id + ')">' +
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

    function addNewExpense() {
        $scope.expense = {
            //dateTime: new Date()
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
    vm.removeExpense = removeExpense;
    vm.dtInstance = {};
    vm.expenses = [];
    vm.addNewExpense = addNewExpense;

    //expenses
    $scope.expense = {};
    $scope.new = true;
    $scope.selected = false;
    $scope.submitExpenseForm = function (isValid) {
        console.log("Submit")
        $scope.expense.recurring = true;
        if ($scope.new) {
            addExpense($scope.expense).then(function (response) {
                vm.dtInstance.reloadData();
            });
        }
        else {
            updateExpense($scope.expense).then(function (data) {
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
            url: '/recurringExpenses',
            headers: { 'x-auth': JSON.parse(localStorage.getItem('token')) },
            dataSrc: function (data) {

                let i = 0;
                data.expenses = data.expenses.map(function (el) {
                    el.start = moment(el.start).format('DD-MM-YYYY');
                    el.end = moment(el.end).format('DD-MM-YYYY');
                    el.id = i;
                    i++;
                    return el;
                });
                return data.expenses;
            }
        })
        .withPaginationType('full_numbers')
        .withOption('createdRow', createdRow)
        .withBootstrap();

    vm.dtColumns = [
        DTColumnBuilder.newColumn('text').withTitle('Expense'),
        DTColumnBuilder.newColumn('amount').withTitle('Amount'),
        DTColumnBuilder.newColumn('category').withTitle('Category'),
        DTColumnBuilder.newColumn('start').withTitle('Start date'),
        DTColumnBuilder.newColumn('end').withTitle('End date'),
        DTColumnBuilder.newColumn(null).withTitle('Actions').notSortable()
            .renderWith(actionsHtml)
    ];



    //Date picker
    this.myDate = new Date();
    vm.isOpen = false;


}]);