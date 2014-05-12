var express = require('express'),
  http = require('http'),
  path = require('path'),
  app = express();

var AntiLeech = require('../../');

app.use(AntiLeech());
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8004);

app.get('/', function(req, res) {
  res.redirect("/index.html");
});

app.listen(app.get('port'), function() {
  console.log("Express test server listening on http://localhost:" + app.get('port'));
});