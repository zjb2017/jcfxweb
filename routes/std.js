var express = require('express');
var router = express.Router();

var querystring = require('querystring');
//json转换为字符串


var jcblsrv = require('../jcblsrv');


/* GET home page. */
router.post('/', function (req, res, next) {
    var r = {};

    var t = req.query['t'];
    switch (t) {
        case 'add': {
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

            var act='user.sql.add.stduent'
            jcblsrv.DBRequest(act,postData, function (chunk) {
                //将处理完毕的数据返回WEB客户端
                res.send(chunk);
            });

            /* if (req.body.login == 'admin' && req.body.password == '123456') {
               //设置Session，保存登录状态
               req.session.user_id = 'admin';
               req.session.user_name = 'admin';
               //发送数据给客户端
       
       
               r.success = 'success';            //业务层成功标示(success/failed)
               r.errCode = 0;
               r.msg = '登录成功';*/
            // } else {
            r.success = 'failed';            //业务层成功标示(success/failed)
            r.errCode = 1;
            r.msg = '数据添加成功';
            //}

            break;
        }
        default:
            {
                r.success = 'failed';            //业务层成功标示(success/failed)
                r.errCode = 500;
                r.msg = 'Invalid Parameter';

                var resdata = JSON.stringify(r);
                res.send(resdata);

                break;
            }
    }



});


module.exports = router;
