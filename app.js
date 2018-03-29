const express = require('express');
const serveStatic = require('serve-static');

const app = express();

app.use(serveStatic('public/task6/'));

const server = app.listen(3030, () => {
	console.log(`Server on port ${server.address().port}`);
});