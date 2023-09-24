const NotFoundError = require('../errors/NotFoundError');

const notFound = (req, res, next) => {
  next(new NotFoundError('Указан несуществующий URL'));
};

module.exports = { notFound };
