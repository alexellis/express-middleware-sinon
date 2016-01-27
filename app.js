var middle = require('./middle');
var express = require('express');

var app = express();

app.disable('x-powered-by');	// alternative use helmet npm package.

app.use(
	middle(["/admin"], ["/"], function(token) {
	return false;}
));

app.listen(8080, function() {
	console.log("Started");
});
