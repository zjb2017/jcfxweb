var express = require('express');
var router = express.Router();

//json转换为字符串,用在POST提交参数用
var querystring = require('querystring');


var jcblsrv = require('../jcblsrv');


/* GET home page. */
router.post('/', function (req, res, next) {


    var t = req.query['t'];
    switch (t) {
        case 'add': {
            //获取WEB前端提交过来的POST参数
            var xh = req.body.xh;
            var xm = req.body.xm;
            var xb = req.body.xb;
            var pwd = req.body.pwd;


            //将WEB前端提交来的数据打包发送给【数据层】进行处理
            var postData = querystring.stringify({
                XH: xh,
                XM: xm,
                XB: xb,
                PWD: pwd
            });


            res.send('OKKKKK');

            //数据层接口调用
            /*
            var act = 'user.sql.add.stduent';
            jcblsrv.DBRequest(act, postData, function (chunk) {
                //将处理完毕的数据返回WEB客户端
                res.send(chunk);
            });*/

            break;
        }
        case 'cx': {
            //获取WEB前端提交过来的POST参数
            var page = req.body.page;
            var rows = req.body.rows;
            var itemid = req.body.itemid;
            var productid = req.body.productid;
            //将WEB前端提交来的数据打包发送给【数据层】进行处理
            var postData = querystring.stringify({

            });
            var act = 'user.sql.query.stduent'
            jcblsrv.DBRequest(act, postData, function (chunk) {
                //将处理完毕的数据返回WEB客户端，由于前端WEB采用了DataGrid表格对象，所以对返回值进行一个处理，以满足其格式
                //res.send(chunk);
                var d = JSON.parse(chunk);
                if (d.success == 'true' && d.errCode == '0') {
                    //数据层查询成功
                    var rows = d.result;
                    var total = d.totalCount;
                    var data = JSON.stringify({
                        total: total,
                        rows: rows
                    });
                    res.send(data);
                } else {
                    //数据层查询失败,返回空数据
                    res.send('{"total":0,"rows":[]}');
                }
            });

            break;
        }
        default:
            {
                var r = {};
                r.success = 'false';            
                r.errCode = 500;
                r.msg = 'Invalid Parameter';
                var resdata = JSON.stringify(r);
                res.send(resdata);

                break;
            }
    }



});


module.exports = router;
