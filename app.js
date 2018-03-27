var http = require('http');
const fs = require('fs');

const rootMain = 'public/task6';


http.createServer(function (request, response) {

  const url = request.url === '/' ? '/index.html' : request.url;

  fs.readFile(rootMain + url, function(err, data) {
  	if(err){
  		response.end(err.message);
  	} else {
    response.end(data);
    }
  });
}).listen(3030);