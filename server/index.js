const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const uuid = require('uuid').v4

const config = require('../config/appconfig');
const Logger = require('../middleware/logger.js');

const logger = new Logger();
const app = express();


app.set('config', config); // the system configrations
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(compression());
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const swagger = require('../utils/swagger');


process.on('SIGINT', () => {
    logger.log('stopping the server', 'info');
    process.exit();
});

// connect to the database
const connectToDatabase = require("../database");
connectToDatabase();

// cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/set-cookies', (req, res) => {
    // res.setHeader('Set-Cookie', 'newUser=true');
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send('you got the cookies!');
});

app.get('/read-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies.newUser);
    res.json(cookies);
});

app.set('port', process.env.DEV_APP_PORT);
app.use('/api/docs', swagger.router);

app.use((req, res, next) => {
    req.identifier = uuid();
    const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
    logger.log(logString, 'info');
    next();
});

app.use(require('../router'));

app.use((req, res, next) => {
    logger.log('the url you are trying to reach is not hosted on our server', 'error');
    const err = new Error('Not Found');
    err.status = 404;
    res.status(err.status).json({ type: 'error', message: 'the url you are trying to reach is not hosted on our server' });
    next(err);
});

module.exports = app;
