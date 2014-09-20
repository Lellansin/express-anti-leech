var express = require('express'),
  path = require('path'),
  app = express();

var AntiLeech = require('../../');

// white list
var hosts = ['localhost:3001', 'localhost:8004', 'localhost'];

// filter type
var exts = ['.png', '.jpg', '.jpeg', '.gif', '.swf', '.flv'];

// default show picture
var pictrue = "/images/default.png";

app.use(AntiLeech({
  allow: hosts,
  exts: exts,
  log: console.log, // you can use your own
  default: pictrue
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