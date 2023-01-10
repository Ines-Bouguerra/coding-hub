const mongoose = require('mongoose');
const Logger = require('../middleware/logger.js');
const logger = new Logger();
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

async function connectToDatabase() {
    try {
        const username = process.env.DB_USERNAME;
        const password = process.env.DB_PASSWORD;
        const host = process.env.DB_HOST;
        const dbName = process.env.DB_NAME;

        const connectionString = "mongodb+srv://" + `${username}:${password}@${host}.uh8odf8.mongodb.net/${dbName}?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString, {
            serverSelectionTimeoutMS: 5000
        });
        logger.log('connected to the database', 'info');
    } catch (err) {
        logger.log(`error connecting to the database ${err}`, 'error');
    }
}

module.exports = connectToDatabase;