const middleware = {
    requireAuthentication: function(req, res, next) {
        console.log('private requireAuthenticationrequest:');
        next();
    },
    logger: function(req, res, next) {
       console.log('logger request hit:');
       next();
    }
}

module.exports = middleware;