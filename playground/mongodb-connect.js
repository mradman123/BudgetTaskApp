//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TaskApp', (err, db) => {
  if(err){
     return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MonogDB server');

  // db.collection('Tasks').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //      return console.log('Unable to insert task', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //     name: 'Marin',
  //     location: 'Split',
  //     age: 27
  //   }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert user', err);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});
