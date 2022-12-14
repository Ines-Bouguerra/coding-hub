const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const uuid = require('uuid').v4

const config = require('../config/appconfig.js');
const Logger = require('../utils/logger.js');

const logger = new Logger();
const app = express();
app.set('config', config); 
app.use(bodyParser.json());
app.use(require('method-override')());

app.use(compression());
app.use(cors());