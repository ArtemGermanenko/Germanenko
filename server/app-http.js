const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  const url = request.url === '/' ? '/index.html' : request.url;
  fs.readFile(`public/UI${url}`, (err, data) => {
  	if (err) {
  	 response.end(err.message);
  	} else {
      response.end(data);
    }
  });
}).listen(3030);
