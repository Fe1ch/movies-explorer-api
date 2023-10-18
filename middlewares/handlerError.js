const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;
const {
  STATUS_BAD_REQUEST,
  STATUS_NOT_FOUND,
  STATUS_CONFLICT,
  STATUS_INTERNAL_SERVER_ERROR,
} = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorMessages } = require('../utils/constants');

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(STATUS_BAD_REQUEST).send({
      message: errorMessages.VALIDATION_ERROR,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(STATUS_NOT_FOUND).send({
      message: errorMessages.DOCUMENT_NOT_FOUND,
    });
  }
  if (err instanceof CastError) {
    return res.status(STATUS_BAD_REQUEST).send({
      message: errorMessages.CAST_ERROR,
    });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).send({
      message: errorMessages.UNAUTHORIZED,
    });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({
      message: errorMessages.FORBIDDEN,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: errorMessages.NOT_FOUND,
    });
  }
  if (err.code === 11000) {
    return res.status(STATUS_CONFLICT).send({
      message: errorMessages.CONFLICT,
    });
  }
  res.status(STATUS_INTERNAL_SERVER_ERROR).send({
    message: errorMessages.INTERNAL_SERVER_ERROR,
  });
  return next();
});
