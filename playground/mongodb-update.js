//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TaskApp', (err, db) => {
  if(err){
     return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MonogDB server');

  // db.collection('Tasks').findOneAndUpdate({
  //   _id: new ObjectID('58e3db2152dd93877df2d14d')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate({
    name: 'Jen'
  }, {
    $set: {
      name: 'Marin'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });


  //db.close();
});
