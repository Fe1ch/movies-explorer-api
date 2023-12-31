const { STATUS_FORBIDDEN } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = STATUS_FORBIDDEN; // 403
  }
}
module.exports = ForbiddenError;
