// 'use strict'; // eslint-disable-line strict
const dotenv = require('dotenv').config();
const express = require('express');
const { env } = require('./configs/env');
const app = express()

const { MIDDLEWARES, parser, headers } = require('./api/middlewares/index');

const HOST = 'localhost',
	PORT = 8000;
// import { RedisService } from './services/redis';

// Startup


// Connect redis:
// RedisService.connect();

// Init express server app
app.use(express.json());
app.use(MIDDLEWARES);
app.use(parser.bodyParserUrlencoded);
app.use(parser.bodyParserJson);
app.use(parser.bodyParserRaw);
app.use(headers);
// Start server
app.listen(PORT, HOST, () => {
	// Initializes the app APIs
	require('./api/index')(app, PORT);

	console.log(`Node server is listening on: \x1b[36m http://${HOST}:${PORT}\x1b[0m`);
	// logger.info(`node server is listening on port ${env.NODE_PORT} in ${env.NODE_ENV} mode`);
	// server.close(9999)
	// process.exit(1234)
});