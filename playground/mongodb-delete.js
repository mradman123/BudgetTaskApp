//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
     return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MonogDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').deleteMany({name: 'Marin'}).then((result) =>{
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({
    _id : new ObjectID('58e3ce3269b9cd19846d6084')
  }).then((results) => {
    console.log(results);
  });

  //db.close();
});
