const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = options.encoding;
    this._last = '';
  }

  _transform(chunk, encoding, callback) {
    const lines = (this._last + chunk.toString(this.encoding)).split(os.EOL);

    this._last = lines.pop();

    for (const line of lines) {
      this.push(line);
    }

    callback();
  }

  _flush(callback) {
    this.push(this._last);

    callback();
  }
}

module.exports = LineSplitStream;
