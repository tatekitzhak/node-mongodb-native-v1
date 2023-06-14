const { MongoClient } = require('mongodb')
const config = require('../configs/config');

// https://stackoverflow.com/questions/70581891/get-mongodb-collection-by-name-in-node-js
// https://hevodata.com/learn/node-express-mongodb/


class Database {
  constructor() {
    const MongoClient = require('mongodb').MongoClient;

    const dbHost = 'localhost';
    const dbUser = 'mongo_db_admin';
    const dbPass = 'EXAMPLE_PASSWORD';
    const dbPort = 27017;
    const dbName = "my_company";
    
    this.url = `${config.db.name}://${config.db.host}:${config.db.port}`;
    this.dbName = '';
    this.name = this.constructor.name;
    this.client = ''
  }

  async listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

  async connect(cb){

    try {

      const mongo = new MongoClient(this.url, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      
      this.client = await mongo.connect()
      const db = this.client.db('contxt');

      cb('this.db');
      console.log('\x1b[36m', `${1}:`, '\x1b[0m', 'connections process...');
      
      return this.client;

    } catch (e) {
      console.log('Error Type::',e.name); // Error Type: in this case just Error

      console.log(' Error Message:',e.message); // Error Message: The string we’ve passed as an argument to the error constructor in the try block

      console.log('Error Stack: ',e.stack)
      // onFailure(ex);
      cb(e);
    }

  }

  async connect3(){

    try {
      var client = await this.mongo.connect();

      const db = client.db('contxt');
      console.log("MongoClient Connection successfull:", this);
      // onSuccess()
      return db;
    } catch (error) {
      console.log('Error Type::',e.name); // Error Type: in this case just Error

      console.log(' Error Message:',e.message); // Error Message: The string we’ve passed as an argument to the error constructor in the try block

      console.log('Error Stack: ',e.stack)
      // onFailure(ex);
    }
  }

  async close() {
    console.log('close:',)
    
     await this.client.close();
  }
}

module.exports = new Database();