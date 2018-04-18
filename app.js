var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan'); //node.js关于http请求的日志中间件
var cookieParser = require('cookie-parser'); //解析cookie的中间件
var bodyParser = require('body-parser');
//路由
var routes = require('./routes/index');
var users = require('./routes/users');
//db
var mysql = require("mysql");

//db配置
var con = mysql.createConnection({
    host: "localhost", //主机 默认为localhost
    user: "root",
    password: "root",
    database: "node" //数据库名
});
//连接（成功与否在控制台输出信息）
con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});
//创建express应用
var app = express();

// 设置模板路径和模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//挂载中间件
app.use(logger('dev'));//使用日志中间件
app.use(bodyParser.json());//加载解析json的中间件。
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件。
app.use(cookieParser());//加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public'))); //static：设置静态资源的路径；缺少会导致静态资源无法访问

// db state
app.use(function(req, res, next) {
    req.con = con;
    next();
});

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
