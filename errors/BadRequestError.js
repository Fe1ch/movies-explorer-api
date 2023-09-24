const { STATUS_BAD_REQUEST } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = STATUS_BAD_REQUEST; // 400
  }
}
module.exports = BadRequestError;
