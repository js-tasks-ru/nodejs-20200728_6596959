const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);

    this.limit = options.limit;
    this.currentLength = 0;
  }

  _transform(chunk, encoding, callback) {
    this.currentLength += 1;
    if (this.currentLength <= this.limit) {
      callback(null, chunk);
    } else {
      callback(new LimitExceededError());
    }
  }
}

module.exports = LimitSizeStream;
