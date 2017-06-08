var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var session = require('express-session')

var bodyParser = require('body-parser');

var login = require('./routes/login');
var index = require('./routes/index');
var users = require('./routes/users');

var module_ejs=require('./routes/LoadModule');

var students= require('./routes/std');

var app = express();


var sess = {
  secret: 'keyboard cat',
  cookie: {}
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//身份验证
app.use('/login', login);

//Session 检查，判断是否登陆成功
app.use(function (req, res, next) {
  if (typeof (req.session.user_id) == 'undefined') {
    res.redirect('/login?t=login');
  } else {
    next();
    //已经登录过，且会话没有过期，则继续执行下面的 代码
  }
});


app.use('/index', index);
app.use('/users', users);

app.use('/LoadModule',module_ejs);

app.use('/std',students)




//登录成功后，如果再次访问根，就踢回到登录,避免有漏洞 ^.^
//app.use('/',function (req, res, next){
   // res.redirect('/login?t=login');
//   next();
//});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
