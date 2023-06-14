require('./src/app');

/* 
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoCli = require('./src/db/connection')
var config = require('./src/configs/config'); 
// const routes = require('./routes')


// Add the body parses middleware, as well as the HTTP routes
// app.use(bodyParser.json())


const bootDatabase = async () => {
  const client = await mongoCli.connect(function (db) {
    console.log('bootDatabase:')
  })

   mongoCli.listDatabases(client)
  
  db = client.db('convertxt')

  const categories = await db.collection('category').find({}).toArray();

  
  // console.log('categories:',categories)

  const subcategories = await db.collection('subcategory').find({}).toArray();
  // console.log('subcategories:', subcategories)

  await app.get('/', (req, res, next) => {
		res.json({ subcategories })
	
  });

  console.log('starting server on port 3000:',config.app.port)
  app.listen(3000, () => {
    console.log(`Node server is listening on: \x1b[36m http://\x1b[0m`);
    // logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
    // server.close(9999)
    // process.exit(1234)
  });
};

bootDatabase(); */