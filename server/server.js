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
const hotServer = require('./webpack')

var http = require('http').Server(app);
var session = require('express-session')
// var io = require('socket.io')(http)
var websocket = require('./websocket')
var isDev = process.env.NODE_ENV !== 'production';

// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer
app.set('port', (process.env.port || 3000))
// app.use(favicon(resolve('../dist/favicon.ico')))
// 处理请求体所带的参数转为json格式方便处理
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser('ownsecret'))
// 处理静态文件路径,服务器读取../dist文件下的静态文件
app.use(express.static(resolve('../dist')))
app.use(session({
    secret: 'ownsecret', // 对session id 相关的cookie 进行签名
    resave: false,
    saveUninitialized: true, // 是否保存未初始化的会话
    // 设置存储session id的cookie信息
    cookie: {
        secure: false, // 设置为true时，非https请求不会设置cookie
        maxAge: 1000 * 60 * 3 // 设置次cookie的过期时间
        // 传统cookie被设置在浏览器中，session id存储在服务器内存中
    }
}))

// CORS跨域配置
app.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
		if (req.method == 'OPTIONS'){
			res.sendStatus(200)
		    // 让options请求快速返回
		}
		else {
		    next();
		}
});




// webpack提供的静态服务器供页面展示,当通过nodejs提供dev-server服务时,需要在webpakc入口文件添加webpack-dev-server/client?http://«path»:«port»/
// 并且将<script src="http://localhost:3001/webpack-dev-server.js"></script>添加到html文件中
// server.listen(3001,'0.0.0.0',()=>{
    
// });


// 后端拦截器
// app.all('/*',function(req,res,next){
//     // console.log(req.path)
//     if(req.path == '/api/login' || req.path == '/api/register'){
//         next()
//         return
//     }else{
//         if(req.session.userName){
//             next()
//             return
//         }else{
//             res.send({err:true,msg:'unlogin'})
//             // res.redirect('/login') 服务端发起的重定向会被chrome拦截
//         }
//     }
// })

// 使用 express.Router 类来创建可安装的模块化路由处理程序
// 传入模块化的路由处理程序，当作后端接口
app.use(api)

// socket.io处理通信
websocket(http)

if(isDev){
    // webpack-middle-ware和webpack-hot-middleware
    app.use(server)
    app.use(hotServer)
    // 此处是由http模块express为载体的服务器端
    http.listen(app.get('port'), '0.0.0.0',function () {
        console.log('Visit http://localhost:' + app.get('port'))
    })
}else{
    
}