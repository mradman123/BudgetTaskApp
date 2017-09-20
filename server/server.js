require('./config/config.js');

const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const path = require('path');
const moment = require('moment');

var {mongoose} = require('./db/mongoose');
var {Task} = require('./models/task');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
var port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname + '/frontend')));
app.use(bodyParser.json());

app.get('/', (req, res) => {  
  res.sendFile(__dirname + '/frontend/views/index.html');
});

app.post('/tasks', authenticate, (req, res) => {
  console.log("Task recieved on server: " + req.body.dateTime)
  let task = new Task({
    text: req.body.text,
    _creator: req.user._id,
    dateTime: req.body.dateTime
  });

  task.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/tasks', authenticate, (req, res) => {
  Task.find({
    _creator: req.user._id
  }).then((tasks) => {
    res.send({tasks});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/tasks/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
    return console.log('Id is not valid');
  }
  Task.findOne({
    _id: id,
    _creator: req.user._id
  }).then((task) => {
    if(!task){
      return res.status(404).send();
    }
    res.status(200).send({task});
  }, (e) => res.status(400).send());
});

app.delete('/tasks/:id', authenticate, (req,res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
    return console.log('Id is not valid');
  }
  Task.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((task) => {
    if(!task){
       return res.status(404).send();
    }
    res.status(200).send({task});
  }, (e) => res.status(400).send());

});

app.patch('/tasks/:id', authenticate,  (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed', 'dateTime']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }

  Task.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((task)=> {
    if(!task){
      return res.status(404).send();
    }

    res.send({task});
  }).catch((e)=>{
    res.status(400).send();
  });
});


//Find tasks by date
app.post('/tasks/byDate', authenticate, (req, res) => {
  console.log(req.body)
  let date = req.body.date;
  var today = moment(date).startOf('day')
  var tomorrow = moment(today).add(1, 'days')
  Task.find({
    _creator: req.user._id,
    dateTime: {
      $gte: today.toDate(),
      $lt: tomorrow.toDate()
    }

  }).then((tasks) => {
    res.send({tasks});
  }, (e) => {
    res.status(400).send(e);
  });
});


//POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});




app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}

app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });

  //res.send(body);
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
