

require('dotenv').config();

// config.js
module.exports = {
    app: {
        port: process.env.DEV_APP_PORT || 3000,
        appName: process.env.APP_NAME || 'coding hub',
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        logging: true,
    },
    winiston: {
        logpath: '/coding hub/Logs/logs/',
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET,
        jwt_expiresin: process.env.JWT_EXPIRES_IN || '1d',
        saltRounds: process.env.SALT_ROUND || 10,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET || 'VmVyeVBvd2VyZnVsbFNlY3JldA==',
        refresh_token_expiresin: process.env.REFRESH_TOKEN_EXPIRES_IN || '2d',
    },
    sendgrid: {
        api_key: process.env.SEND_GRID_API_KEY,
        api_user: process.env.USERNAME,
        from_email: process.env.FROM_EMAIL || 'ines.bouguerra.22@gmail.com',
    },

};
