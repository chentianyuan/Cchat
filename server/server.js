const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./db')
const resolve = file => path.resolve(__dirname, file)
const api = require('./api')
const app = express()
const server = require('./webpack')

var http = require('http').Server(app);
var session = require('express-session')
// var io = require('socket.io')(http)
var websocket = require('./websocket')


// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
// app.use(favicon(resolve('../dist/favicon.ico')))
// 处理请求体所带的参数转为json格式方便处理
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
// 处理静态文件路径
app.use('/dist', express.static(resolve('../dist')))
app.use(session({
    secret: 'ownsecret', // 对session id 相关的cookie 进行签名
    resave: false,
    saveUninitialized: true, // 是否保存未初始化的会话
    // 设置存储session id的cookie信息
    cookie: {
        secure: true,
        maxAge: 1000 * 6 * 3 // 设置次cookie的过期时间
        // 传统cookie被设置在浏览器中，session id存储在服务器内存中
    }
}))

//CORS跨域配置
app.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		if (req.method == 'OPTIONS'){
			res.sendStatus(200)
		    //让options请求快速返回
		}
		else {
		    next();
		}
});




// webpack提供的静态服务器供页面展示,当通过nodejs提供dev-server服务时,需要在webpakc入口文件添加webpack-dev-server/client?http://«path»:«port»/
// 并且将<script src="http://localhost:3001/webpack-dev-server.js"></script>添加到html文件中
server.listen(3001,'0.0.0.0',()=>{
    
});

// port3000提供的是api接口服务和socket.io连接监听程序，要看业务页面要去3001端口

app.get('/',(req,res)=>{
    res.send(
        '<h1>接口提供页面，提供接口详细信息</h1><h2>请访问3001端口</h2>'
    )
})

// 使用 express.Router 类来创建可安装的模块化路由处理程序
// 传入模块化的路由处理程序，当作后端接口
app.use(api)

// socket.io处理通信
websocket(http)


// express提供的服务器在3000端口(不设置的话默认3000)
// 此处是由http模块express为载体的服务器端
http.listen(app.get('port'), '0.0.0.0',function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
