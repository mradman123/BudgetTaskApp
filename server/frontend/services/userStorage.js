app.service('userStorage', function() {

    this.storeUser = function(data) {
        // Save User into storage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Save Token into storage
        localStorage.setItem('token', JSON.stringify(data.token));
        // go to index
    };
 
});