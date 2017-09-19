const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

Todo.findByIdAndRemove('58f919f4fa6e002b0f4b242d').then((todo) => {
  console.log(todo);
});
