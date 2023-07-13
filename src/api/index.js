const { ReadWriteFilesRouter, ReadWriteToAWSS3BucketsRouter, Router } = require('./routes/index');
const { getCategory } = require('./controllers/category.js');
const dbQuery = require('../db/query.js');

module.exports = function (app, args) {
	console.log('Environment:', args)

	/**
     * API Route.
	 * The home page will start with "/"
     * All the API will start with "/api/[MODULE_ROUTE]"
     */
	const setHomePageInfo = (req, res, next, visitor) => {
		
		console.log(req.headers.host, visitor)
		req.requestInfo = visitor;
		next();
	};


	// The Home page
	app.get('/', function (req, res, next) {
		setHomePageInfo(req, res, next, 'Home page')
	},
		async (req, res, next) => {

			const data = await dbQuery.read()
			const req_info = [{
				"headers": req.headers,
				search_query: req.url,
				middleware_info: req.requestInfo,
				data: data
			}];
			
			res.status(200)
				.set({ 'status': 'OK' })
				.json(req_info);

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