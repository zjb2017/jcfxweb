var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  
      var t = req.query['t'];
      var m='module/'+req.query['m'];
      
  switch (t) {
    case 'show': {
        res.render(m, {
        title: 'Express'
      });
        break;
    }
    default:
    {
          res.send('error');
        break;
    }
}


      

});

module.exports = router;
