var url = require('url');
var path = require('path');

function AntiLeech(options) {

  /*
 todo load options

 SET default show pictrue
*/

  // white list
  var host = ['localhost:3001', 'localhost'];

  // anti leech type
  var img = ['.png', '.jpg', '.jpeg', '.gif', '.swf', '.flv'];

  var isTrustSite = function(referer) {
    // no referer not trust
    if (!referer) {
      return false;
    }
    var url_obj = url.parse(referer);
    for (var i = 0; i < host.length; i++) {
      if (url_obj.host == host[i]) {
        return true;
      }
    }
    return false;
  };

  var filter = function(url) {
    var ext = path.extname(url);
    for (var i = 0; i < img.length; i++) {
      if (ext == img[i]) {
        return true;
      }
    }
    return false;
  };

  return function session(req, res, next) {

    // ignore these methods
    if ('GET' == req.method || 'HEAD' == req.method || 'OPTIONS' == req.method) return next();

    var referer = req.headers.referer;
    var url = req.url;

    if (filter(url)) {
      if (!isTrustSite(referer)) {
        res.send('');
        return;
      }
    }

    next();

  });
};