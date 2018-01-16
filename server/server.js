const fs = require('fs')
const path = require('path')
const express = require('express')
//const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
//const db = require('./db')
const resolve = file => path.resolve(__dirname, file)
//const api = require('./api')
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
//app.use(api)


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


// app.post('/api/setup', function (req, res) {
//   new db.User(req.body)
//     .save()
//     .then(() => {
//       res.status(200).end()
//       db.initialized = true
//     })
//     .catch(() => res.status(500).end())
// })

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    // noInfo: true,
    stats: { 
        colors: true  // 用颜色标识
    },
    proxy: {
        "api": "http://localhost:3001" // 用于转发api数据，但webpack自己提供的并不太好用
    },
});

server.listen(3001);


// port3000提供的是api接口服务，不聊，要看业务页面要去3001端口
// app.get('*', function (req, res) {
//   const fileName = db.initialized ? 'index.html' : 'setup.html'
//   const fileName = 'setup.html' 
//   const html = fs.readFileSync(resolve('../dist/' + fileName), 'utf-8')
//   const html = fs.readFileSync(resolve('../setup.html'), 'utf-8')
//   res.send(html)
// })

app.listen(app.get('port'), function () {
  console.log('Visit http://localhost:' + app.get('port'))
})
