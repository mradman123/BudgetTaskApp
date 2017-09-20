const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Task} = require('./../server/models/task');
const {User} = require('./../server/models/user')

// var id = '58e76e6989f968bc1f0c11ff';
//
// if(!ObjectID.isValid(id)){
//   console.log('ID not valid');
// }
//
// Task.find({
//   _id: id
// }).then((todos) => {
//   console.log('Tasks', todos);
// });
//
// Task.findOne({
//   _id: id
// }).then((task) => {
//   console.log('Task', task);
// });
//
// Task.findById(id).then((task) => {
//   if(!task){
//     return console.log('Id not found');
//   }
//   console.log('Task by id', task);
// }).catch((e) => console.log(e));

var userId = '58e692b3453a772817a3e2a2';

User.findById(userId).then((user) => {
  if(!user){
    return console.log('User not found');
  }
  console.log('User by Id', user);
}).catch((e) => {
  console.log(e);
});
