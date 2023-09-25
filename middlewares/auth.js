const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;
const { MODE_PRODUCTION, DEV_KEY } = require('../utils/config');
const { errorMessages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(errorMessages.UNAUTHORIZED_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === MODE_PRODUCTION ? SECRET_KEY : DEV_KEY);
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.UNAUTHORIZED_INVALID_TOKEN));
  }

  req.user = payload;

  return next();
};
