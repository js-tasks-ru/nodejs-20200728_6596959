const url = require('url');
const http = require('http');
const path = require('path');
const fs = require('fs');

const server = new http.Server();

server.on('request', (req, res) => {
  const pathname = url.parse(req.url).pathname.slice(1);

  const filepath = path.join(__dirname, 'files', pathname);

  switch (req.method) {
    case 'GET':
      if (path.dirname(req.url) === '/') {
        fs.createReadStream(filepath).on('error', (err) => {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
            res.end(`no file ${res.statusCode}`);
          } else {
            res.statusCode = 400;
            res.end('Something went wrong');
          }
        }).pipe(res);
      } else {
        res.statusCode = 400;
        res.end('error subdirectory');
      }
      break;

    default:
      res.statusCode = 501;
      res.end('Not implemented');
  }
});

module.exports = server;
