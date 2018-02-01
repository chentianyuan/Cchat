const fs = require('fs')
const path = require('path')
const express = require('express')
//const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./db')
const resolve = file => path.resolve(__dirname, file)
const api = require('./api')
const app = express()
var webpack = require('webpack')
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("../webpack.config.js");



// const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

app.set('port', (process.env.port || 3000))
//app.use(favicon(resolve('../dist/favicon.ico')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use('/dist', express.static(resolve('../dist')))
// 使用 express.Router 类来创建可安装的模块化路由处理程序
// 传入模块化的路由处理程序，当作后端接口
app.use(api)


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


var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    // noInfo: true,
    stats: { 
        colors: true  // 用颜色标识
    },
    proxy: {
        "/api/*":{
            // network上显示的是localhost:3001其实已经被代理
            // 用于转发api请求，但webpack自己提供的并不太好用
            target:"http://localhost:3000", 
            changeOrigin: true
        }
    },
});

//webpack提供的静态服务器供页面展示
server.listen(3001);

// port3000提供的是api接口服务，不聊，要看业务页面要去3001端口

app.get('/',(req,res)=>{
    res.send('<h1>接口提供页面，提供接口详细信息</h1>')
})

//express提供的服务器在3000端口(不设置的话默认3000)
app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
