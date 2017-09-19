var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// let db = {
//   localhost: 'mongodb://localhost:27017/TodoApp',
//   mlab: 'mongodb://mradman123:1234@ds157740.mlab.com:57740/todo-app-api'
// };

//Use for production
mongoose.connect(process.env.MONGODB_URI);


//Use for local development
//mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
};
