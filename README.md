# express基础教程

### 一、express作用
&emsp;&emsp;express是基于node.js的一个web应用开发框架，提供了很多特性可以帮助我们创建各种web和移动设备应用。整个 Express 的设计哲学就是不断对 HTTP 请求加工，然后返回一个 HTTP 回应。


### 二、express使用

&emsp;&emsp;创建一个express应用实例:
```
var express = require('express');

//创建express应用

var app = express();
```
app对象主要有以下四种使用方法：
-   路由HTTP请求：
-   配置中间件
-   渲染HTML视图
-   注册模板引擎


### 三、路由http请求
1. 路由的http请求：get、post等
2. 使用时：`app.get(‘/’，（req，res）=>{})`。

3. 第一个参数为路径，第二个参数为函数形参分别为请求信息和响应信息app.get(name)可以获取当前app的名为name的配置（有固定的名称）

![image](https://raw.githubusercontent.com/Tsite2007/nodejs-express-ejs-mysql/master/public/readmeImages/expMethod.png)

### 四、配置中间件
1. 中间件其实就是封装好的功能插件，例如日志、协议解析、云服务集成等。

2. 挂载中间件方法到路径上。如果路径未指定，默认为“/”,如果路径以“/”结尾，将匹配之后的所有子路径，例如：app.use("a/",...) ,那么将匹配“a/a”,"a/b","a/c/d",一旦挂载到了相对应的路径的路由上，中间件就会被触发
3. 中间件是有顺序的。

4. next（）让中间件像流水线一样运作。一般在中间件的第三个参数定义为next，next函数主要负责将控制权交给下一个中间件，如果当前中间件没有终结请求，并且next没有被调用，那么请求将被挂起，后边定义的中间件将得不到被执行的机会。如果再请求完成后就不能再调用next，否则可能会报错。

5. 路由级中间件与非路由级中间件函数的第三个参数不是同一个next，路由级的如果调用next（“route”）会直接将控制权交到下一个路由。


`Tip：默认为“/”，按照上面的匹配规也就是说不管输入什么路径都会执行这个中间件.`


`Tip：其实如果不调用next（），后面的中间件也会执行，源码中会对中间件遍历，匹配成功就会执行。`




### 五、渲染HTML视图

    app.render(view,[locals],callback)

回调返回一个view渲染之后的html，[locals]是可选的本地数据，
与res.render()类似但是它不能将其发送到客户端。

`Tip：在res.render()内部其实就是使用它来渲染的，如果设置了试图缓存，本地变量缓存就会保留。（有相应的配置，设置为true即可，生产环境默认为true）`    

![image](https://raw.githubusercontent.com/Tsite2007/nodejs-express-ejs-mysql/master/public/readmeImages/apprender.png)

### 六、注册模板引擎
    app.engine(ext, callback)   //注册模板引擎的 callback 用来处理ext扩展名的文件。
举例：

假如我们使用的ejs模板，但是想用ejs的引擎来处理“.html”后缀：

    app.engine('.html', require('ejs').__express);

`ps：__express无需关心，就是ejs模块的一个公共属性，表示要渲染的文件扩展名。`


---

# ejs教程

### 一、cli
我们开始的时候使用	`express -e xxx`  命令生成express使用ejs的cli

真正调用ejs模板是用下面的语句：
```
// 设置模板路径和模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

### 二、使用
```
//  routes/index.js

router.get('/add', function(req, res, next) {
    res.render('userAdd', { title: 'Add User', msg: '' });
});
```
通过res.render()渲染模板，并将页面直接返回给客户端

第一个参数：模板名称 （后缀可选）

第二个参数：给模板引擎的数据对象

Tip：


```
//index.ejs

<link rel='stylesheet' href='/stylesheets/style.css' />
```
这里的样式引用需要使用express内置的中间件static设置静态资源路径
```
//app.js

app.use(express.static(path.join(__dirname, 'public'))); //static：设置静态资源的路径；缺少会导致静态资源无法访问
```




### 三、API
##### 1. ejs标签：
- <% code %>： JavaScript 代码
- <%= code %>：输出数据到模板（输出是转义 HTML 标签）
- <%- code %>：输出非转义的数据到模板
- <%# code %>：注释标签，不执行、不输出内容

##### 2. 包含include
"./views/a.ejs" 和 "./views/user/b.ejs" 两个模板文件，使用 <%- include('a/b'); %> 代码包含后者。<%- 是为了避免对html进行转义。
##### 3. 自定义分隔符
之前可以自定义两侧的<>现在不支持了，只能替换%

---

# mysql教程
### 一、安装
在官网下载mysql安装包，傻瓜式安装并在最后设置好root及密码，软件本身自带client工具，但是不支持汉化，可以自行寻找可视化工具（我本机使用的是HeidSQL）。
### 二、mysql标准语法

1. 查：

```
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
```
- 查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用WHERE语句来设定查询条件。
- 你可以在 WHERE 子句中指定任何条件。
- 你可以使用 AND 或者 OR 指定一个或多个条件。
- WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
- WHERE 子句类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据。

2. 改：

```
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
```
- 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。
- 你可以在 WHERE 子句中指定任何条件
- 您可以在单个表中一次性删除记录。

3. 删：

```
DELETE FROM table_name [WHERE Clause]
```
- 查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用WHERE语句来设定查询条件。
- 你可以在 WHERE 子句中指定任何条件。
- 你可以使用 AND 或者 OR 指定一个或多个条件。
- WHERE 子句也可以运用于 SQL 的 DELETE 或者 UPDATE 命令。
- WHERE 子句类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据。

4. 增：

```
INSERT INTO table_name ( field1, field2,...fieldN )
                       VALUES
                       ( value1, value2,...valueN );
```
如果数据是字符型，必须使用单引号或者双引号，如："value"。

### 三、在node中使用mysql
1.安装依赖

`npm install mysql --save`

2.使用

- 在app.js中，配置options并连接
```
//  app.js
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
```
- 以查询为例，在路由文件中使用db.query()方法对数据库进行操作，数据库语句为sql标准语法


```
//  routes/index.js
router.get('/', function(req, res, next) {

    var db = req.con;
    var data = "";
    var user = req.query.user;
    var filter = "";
    if (user) {
        filter = 'WHERE userid = ?';
    }
    db.query('SELECT * FROM test ' + filter, user, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;
        // use index.ejs
        res.render('index', { title: 'Account Information', data: data, user: user });
    });
});
```
```
//db并不在request里面，之所以能取到是我在app.js中使用中间件挂载到了request上
// db state
app.use(function(req, res, next) {
    req.con = con;
    next();
});
```
