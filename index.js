var express = require("express");
var path = require("path")
var requestIp = require('request-ip');
var os = require('os');

var app = express()

function software(request) {
    var ua = request.headers['user-agent'],
    $ = {};
    
    if (/mobile/i.test(ua)) $.Mobile = true;
    
    if (/like Mac OS X/.test(ua)) {
        $.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/.exec(ua)[2].replace(/_/g, '.');
        $.iPhone = /iPhone/.test(ua);
        $.iPad = /iPad/.test(ua);
        
    }
    
    if (/Android/.test(ua)) $.Android = /Android ([0-9\.]+)[\);]/.exec(ua)[1];
    
    if (/webOS\//.test(ua)) $.webOS = /webOS\/([0-9\.]+)[\);]/.exec(ua)[1];
    
    if (/(Intel|PPC) Mac OS X/.test(ua)) $.Mac = /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/.exec(ua)[2].replace(/_/g, '.') || true;
    
    if (/Windows NT/.test(ua)) $.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(ua)[1];
    
    return $;
    
}


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/api/whoami', function (req, res) {
    var obj = {
        "ipadress": requestIp.getClientIp(req),
        "language": req.headers['accept-language'],
        "sowtware": software(req)
    }
    res.send(obj);

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
