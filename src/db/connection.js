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
    await databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

  async connect(cb){

    try {

      const mongo = new MongoClient(this.url, { 
        useUnifiedTopology: true,
        useNewUrlParser: true
      });
      
      this.client = await mongo.connect()

      cb(this.name);
      console.log('\x1b[36m', `${this.name}:`, '\x1b[0m', 'connected');
      
      return this.client;

    } catch (e) {
      console.log('\x1b[36m', `Error Type:`, '\x1b[0m',e.name); // Error Type: in this case just Error

      console.log('\x1b[36m', ' Error Message:', '\x1b[0m',e.message); // Error Message: The string we’ve passed as an argument to the error constructor in the try block

      console.log( '\x1b[36m', 'Error Stack: ', '\x1b[0m' ,e.stack)
      // onFailure(ex);
      cb(e);
    }

  }

  async close() {
    console.log('close:',)
    
     await this.client.close();
  }
}

module.exports = new Database();