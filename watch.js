var express = require('express');
var http = require('http');

var app = express();

app.use(express.static('.'));

// Create an HTTP service.
http.createServer(app).listen(8000);
console.log('serving on http://localhost:8000');
