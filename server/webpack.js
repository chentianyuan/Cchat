var webpack = require('webpack')
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("../webpack.config.js");

var compiler = webpack(config);
var server = new webpackDevServer(compiler, {
    hot: true,
    historyApiFallback: false,
    // noInfo: true,
    stats: { 
        colors: true  // 用颜色标识
    },
    proxy: {
        "/api":{
            // network上显示的是localhost:3001其实已经被代理
            target:"http://localhost:3000", 
            changeOrigin: true
            // bypass: function(req, res, proxyOptions) {
            //     console.log('代理有效')
            // }
        }
        // "/robot":{
        //     taeget:'http://api.qingyunke.com/api.php',
        //     // pathRewrite:{'^/robot':''},
        //     changeOrigin: true            
        // }
    },
});

module.exports = server