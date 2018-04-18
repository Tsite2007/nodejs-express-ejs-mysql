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

####fdsfdsfdsfdsfdsfds
