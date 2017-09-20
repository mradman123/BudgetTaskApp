const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Task} = require('./../server/models/task');
const {User} = require('./../server/models/user')

// Task.remove({}).then((result) => {
//   console.log(result);
// });

Task.findByIdAndRemove('58f919f4fa6e002b0f4b242d').then((task) => {
  console.log(task);
});
