var express = require('express'),
  path = require('path'),
  app = express();

var AntiLeech = require('../../');

// white list
var hosts = ['localhost', 'localhost:8004'];

// extension filter list
var exts = ['.png', '.jpg', '.jpeg', '.gif', '.swf', '.flv'];

// default redirect url
var url = "/images/default.png";

app.use(AntiLeech({
  allow: hosts,
  exts: exts,
  log: console.log, // you can use your own
  default: url
}));

// keep AntiLeech before use static
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 8004);

app.get('/', function(req, res) {
  res.redirect("/index.html");
});

app.listen(app.get('port'), function() {
  console.log("Express test server listening on http://localhost:" + app.get('port'));
});