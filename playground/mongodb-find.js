//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TaskApp', (err, db) => {
  if(err){
     return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MonogDB server');

  // db.collection('Tasks').find({
  //   _id: new ObjectID('58e3d0e052dd93877df2ce50')
  // }).toArray().then((docs) =>{
  //   console.log('Tasks');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Tasks').find().count().then((count) =>{
  //   console.log(`Tasks count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Marin'}).toArray().then((docs) =>{
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch todos',err);
  })


  //db.close();
});
