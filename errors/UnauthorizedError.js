const { STATUS_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = STATUS_UNAUTHORIZED; // 401
  }
}
module.exports = UnauthorizedError;
