const { ReadWriteFilesRouter, ReadWriteToAWSS3BucketsRouter, Router } = require('./routes/index');
/* 
const { apiRateNetworkTrafficLimiter } = require('../middlewares/rateLimiter');
 */

module.exports = function (app, args) {
	console.log('APIs:',args)
	
	/**
     * API Route.
	 * The home page will start with "/"
     * All the API will start with "/api/[MODULE_ROUTE]"
     */
	app.get('/', (req, res, next) => {
		res.json({ page: req.url })
	
	});

	app.use('/api', Router);

	/* 
	app.use('/aws', ReadWriteToAWSS3BucketsRouter);

	app.use('/process-files', [ services.requireAuthentication, services.logger ], ReadWriteFilesRouter);
 */
	 /**
     * If No route matches. Send user a 404 page
     */
	app.use('/api/*', (req, res, next) => {
		console.log('Error handler1:\n', '/api/*');
		const err = new Error(404, 'fail', 'undefined route\n');
		next(err, req, res, next);
	});

	/* Error handler middleware */
	app.use((err, req, res, next) => {
		console.log('Error handler2:\n', err.message, 'err.stack:\n', err.stack);
		err.statusCode = err.statusCode || 500;

		res.status(err.statusCode).json({
			status: err.statusCode,
			error: err,
			message: err.message,
			stack: err.stack
		});
	});
};