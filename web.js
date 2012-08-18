var express = require('express');
var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.sendfile(__dirname + '/index.html');
})

app.configure(function () {
    app.use('/graphics', express.static(__dirname + '/graphics'));
	app.use('/stylesheets', express.static(__dirname + '/stylesheets'));
	app.use('/scripts', express.static(__dirname + '/scripts'));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
