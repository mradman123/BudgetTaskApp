require('./config/config.js');

const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const path = require('path');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');


var app = express();
var port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname + '/frontend')));
app.use(bodyParser.json());

app.get('/', (req, res) => {  
  res.sendFile(__dirname + '/frontend/views/index.html');
});

app.post('/todos', authenticate, (req, res) => {
  console.log("Todo recieved on server: " + req.body.dateTime)
  let todo = new Todo({
    text: req.body.text,
    _creator: req.user._id,
    dateTime: req.body.dateTime
  });

  todo.save().then((doc) =>{
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
    return console.log('Id is not valid');
  }
  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }, (e) => res.status(400).send());
});

app.delete('/todos/:id', authenticate, (req,res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)){
    res.status(404).send();
    return console.log('Id is not valid');
  }
  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
       return res.status(404).send();
    }
    res.status(200).send({todo});
  }, (e) => res.status(400).send());

});

app.patch('/todos/:id', authenticate,  (req, res) => {
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

  Todo.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((todo)=> {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
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