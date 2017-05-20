var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  var r = {};

  var t = req.query['t'];
  switch (t) {
    case 'login': {
      if (req.body.login == 'admin' && req.body.password == '123456') {
        //设置Session，保存登录状态
        req.session.user_id = 'admin';
        req.session.user_name = 'admin';
        //发送数据给客户端


        r.success = 'success';            //业务层成功标示(success/failed)
        r.errCode = 0;
        r.msg = '登录成功';
      } else {
        r.success = 'failed';            //业务层成功标示(success/failed)
        r.errCode = 1;
        r.msg = '登录失败：用户名密码错误';
      }

      break;
    }
    default:
      {
        r.success = 'failed';            //业务层成功标示(success/failed)
        r.errCode = 500;
        r.msg = 'Invalid Parameter';
        break;
      }
  }

  var resdata = JSON.stringify(r);
  res.send(resdata);

});

router.get('/', function (req, res, next) {
  var t = req.query['t'];

  switch (t) {
    case 'logout': {
      req.session.user_id = '';
      res.render('logout', {
        title: 'Express'
      });
      break;
    }
    default: {
      res.render('login', {
        title: 'Express'
      });
      break;
    }
  }

});

module.exports = router;
