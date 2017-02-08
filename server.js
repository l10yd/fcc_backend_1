var express = require("express");
var path = require("path")
var strftime = require('strftime')
var moment = require("moment")

var app = express()
var u, t;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/:id', function (req, res) {
  var time = req.params.id;
  if(/^\d+$/.test(time)) {
    u = parseInt(time,10);
    t = strftime('%B %d, %Y', new Date(u));
  }
  else if(moment(time.replace(/%20/gi, ' '), 'MMMM DD, YYYY', true).isValid()) {
    t = moment(time.replace(/%20/gi, ' ').replace(/,/g, '')).format("LL");
    u = moment(t).unix();
  }
  else {
    t = null;
    u = null;
  }
  var obj = {
    unix: u,
    natural: t
  }
   res.send(obj)
})

app.listen(8080, function () {

})