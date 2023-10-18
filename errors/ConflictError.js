const { STATUS_CONFLICT } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.statusCode = STATUS_CONFLICT; // 409
  }
}
module.exports = ConflictError;
