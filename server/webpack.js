var webpack = require('webpack')
var webpackDevMiddleware = require("webpack-dev-middleware");
var webpackDevServer = require('webpack-dev-server');
var config = require("../webpack.config.js");

var compiler = webpack(config);
var server = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    // historyApiFallback: false,
    noInfo: true,
    stats: { 
        colors: true  // 用颜色标识
    },
    proxy: {
        "/api":{
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

var hotServer = require('webpack-hot-middleware')(compiler)

module.exports = server
module.exports = hotServer


