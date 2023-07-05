const bodyParser = require('body-parser'),
	cors = require('cors'),
	helmet = require('helmet'),
	logger = require('morgan');

const { env } = require('../../configs/env');
var MIDDLEWARES = [];

/**
 * Init Express middlewares
 */

MIDDLEWARES.push(helmet())
MIDDLEWARES.push(logger('combined'))

// Allow Origins according to your need.
const corsOptions = {
	'origin': '*'
};

if (env.NODE_ENV === 'development') {
	MIDDLEWARES.push(cors(corsOptions))
} else {

	const prod_cors = cors({ origin: [`http://localhost:${env.NODE_PORT}`] });
	MIDDLEWARES.push(prod_cors);
}

const parser = {
	bodyParserUrlencoded: bodyParser.urlencoded({ extended: true }), // to accept POST requests <form> tag which has a body urlencoded 
	bodyParserJson: bodyParser.json(), // to accept POST requests, send the body in JSON format (Ajax and axios)
	bodyParserRaw: bodyParser.raw()
}

const headers = (req, res, next) => {
	const origin = (req.headers.host == 'localhost:8002') ? `http://localhost:${env.NODE_PORT}` : 'http://convertotext.com'
	res.setHeader('Access-Control-Allow-Origin', origin)
		.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
		.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With, Origin')
		.setHeader('Access-Control-Allow-Credentials', true);
	next()
};


module.exports = {
	parser,
	MIDDLEWARES,
	headers
};