const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Task} = require('./../../models/task');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'marin@gmail.com',
  password: 'userOnePass',
  tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'ivo@gmail.com',
  password:'userTwoPass',
  tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'First test task',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test task',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTasks = (done) => {
  Task.remove({}).then(() => {
    return Task.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(()=>{
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(()=> done());
};

module.exports = {todos, populateTasks, users, populateUsers};
