const NotFoundError = require('../errors/NotFoundError');
const { errorMessages } = require('../utils/constants');

const notFound = (req, res, next) => {
  next(new NotFoundError(errorMessages.NOT_FOUND));
};

module.exports = { notFound };
