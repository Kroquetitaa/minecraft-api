const InfraestructureException = require('./infraestructureError.js');

class ErrorFieldsException extends InfraestructureException {
  constructor(message) {
    super(message);
  }
}
module.exports = ErrorFieldsException;
