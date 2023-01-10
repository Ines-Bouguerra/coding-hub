const jwt = require('jsonwebtoken');
const config = require('../config/appconfig');
const RequestHandler = require('../middleware/RequestHandler');
const Logger = require('../middleware/logger');

const logger = new Logger();
const requestHandler = new RequestHandler(logger);

function getTokenFromHeader(req) {
    if ((req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token')
        || (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')) {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}
const verifyToken = (req, res, next) => {
  try {
    if (_.isUndefined(req.headers.authorization)) {
      requestHandler.throwError(
        401,
        "Unauthorized",
        "Not Authorized to access this resource!"
      )();
    }
    const Bearer = req.headers.authorization.split(" ")[0];

    if (!Bearer || Bearer !== "Bearer") {
      requestHandler.throwError(
        401,
        "Unauthorized",
        "Not Authorized to access this resource!"
      )();
    }

    // const token = req.headers.authorization.split(' ')[1];
    const token = req.cookies.jwt;

    if (!token) {
      requestHandler.throwError(
        401,
        "Unauthorized",
        "Not Authorized to access this resource!"
      )();
    }

    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, config.auth.jwt_secret, (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          requestHandler.throwError(
            401,
            "Unauthorized",
            "please provide a vaid token ,your token might be expired"
          )();
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (err) {
    requestHandler.sendError(req, res, err);
  }
};
module.exports = { verifyToken, getTokenFromHeader };