var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res, next) {
  var t = req.query['t'];
  switch (t) {
    case 'login': {
      if (req.body.login == 'admin' && req.body.password == '123456') {
        req.session.user_id = 'admin';
        req.session.user_name='admin';
        res.send('ok');
      } else {
        res.send('Invalid Parameter');
      }

      break;
    }
    default:
      {
        break;
      }
  }

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
