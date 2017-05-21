var http = require('http');

//JCFXBL 数据层请求接口
function DBRequest(act,ReqPostData, callback) {
    var options = {
        host: '127.0.0.1',
        port: 1088,
        path: '/?type=dl&act='+act,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(ReqPostData)
        }
    };

    var req = http.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            callback(chunk);
        });
        res.on('end', function (chunk) {
            console.log("body end: " + chunk);
        })
    });

    req.on('error', function (e) {
        console.error(e.message);
    });

    req.write(ReqPostData);
    req.end();

}



module.exports.DBRequest = DBRequest;