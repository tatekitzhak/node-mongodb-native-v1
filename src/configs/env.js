// Environment variables 
module.exports.env = {
	REDIS_URL: process.env.REDIS_URL,
	ENV: process.env.ENV || 'development',
    NODE_PORT: parseInt(process.env.PORT ) || 8000,
    HOST: process.env.HOST || 'localhost',
    DOMAIN: process.env.DOMAIN,
    aws:{
        ACCESS_KEY_ID: 'AKIA5UPHWDV2PZZMDYXQ',
        SECRET_ACCESS_KEY: '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',
        REGION: 'us-east-2'
    },
    db: {
        host: process.env.DB_HOST,
        uri: "mongodb://127.0.0.1:27017",
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'REPLACE_WITH_YOUR_DB_NAME',
        port: process.env.DB_PORT || 3306
    },
    nodeEnv: {
        DEV: 'development',
        PROD: 'production',
        STAGE: 'stage',
        TEST:  'test',
    },
    paths: {
        app: 'app',
        assets: 'app/assets',
        dist: 'app/dist',
        distAssets: 'app/dist/assets',
        html: 'app/html',
        htmlTmp: '.tmp/htmlsnapshot',
        htmlAssets: 'app/html/assets',
        index: 'app/dist/index.html',
        indexDev: 'app/index.html',
        indexTmp: '.tmp/html/index.html'
    },
	SMTP: {
		auth: {
			pass: process.env.SMTP_PASSWORD || '',
			user: process.env.SMTP_USERNAME || ''
		},
		host: process.env.SMTP_HOST || '',
		port: process.env.SMTP_PORT || '',
		tls: {
			rejectUnauthorized: false
		}
    },
    mails: {
        support: 'support@my-company.com'
    }
};

