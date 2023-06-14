'use strict'; // eslint-disable-line strict
const dotenv = require('dotenv').config();
const express = require('express');
const { env } = require('./configs/env');
const app = express()

const { registerMiddlewareServices, parser } = require('./api/middlewares/index');

const PORT = env.NODE_PORT,
	HOST = env.HOST;
// import { RedisService } from './services/redis';

// Startup
(async function main(args) {

	try {

		// Connect redis:
		// RedisService.connect();

		// Init express server app
		app.use(registerMiddlewareServices);
		app.use(parser.bodyParserUrlencoded);
		app.use(parser.bodyParserJson);
		app.use(parser.bodyParserRaw);

		// Initializes the app APIs
		await require('./api/index')(app, env.NODE_ENV);


		// Start server
		await app.listen(PORT, HOST, () => {
			console.log(`Node server is listening on: \x1b[36m http://${env.HOST}:${env.NODE_PORT}\x1b[0m`);
			// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
			// server.close(9999)
			// process.exit(1234)
		});

		app.on('listening', () => {
			console.log(`Node server.on('listening'): `);
			// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
			// server.close(9999)
			// process.exit(1234)
		});
		process.on('exit', code => {
			// Only synchronous calls
			console.log(`process.on('exit') code: ${code}`)
		})
		app.on('close', (args) => {
	
			// RedisService.disconnect();
			// logger.info('node server closed');
			console.log(`Node server.on('close'): ${args}`)
		});

	} catch (error) {
		// logger.error(err.stack);
		console.log('main error:\n', error)
	}
	finally {
		console.log('finally: app.js  ', args)
	}
})([{ port: env.NODE_PORT }, { env: env.NODE_ENV }]);