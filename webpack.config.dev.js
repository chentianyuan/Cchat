const path = require('path') //处理路径问题
const webpack = require('webpack') //使用webpack自带的HMR模块，监听模块更新
const merge = require('webpack-merge') //合并webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin') //自动生成新的html，注入打包后的入口文件，不用手动引入
const baseConfig = require('./webpack.config.js') //引入要合并的配置文件
const root = path.resolve(__dirname, '..') //预先配置绝对路径

module.exports = merge(baseConfig, {
    entry: [
      'webpack/hot/dev-server', // 热替换处理入口文件
      path.resolve(__dirname, 'src/main.js'),
      path.resolve(__dirname,'src/setup.js')
    ],
    //配置devServer中内置了express模块并开启服务器
    devServer: {
      contentBase:'./dist',
      historyApiFallback: true, // 404的页面会自动跳转到/页面
      inline: true, // 文件改变自动刷新页面
      progress: true, // 显示编译进度
      port: 3000, // 服务器端口
    },
    //应该是webpack-merge更新，导致module并没有合并，而是各自有自己的module
    module:{
        loaders:[{
            test:/\.vue$/,
              loader:'vue-loader',
              exclude:/node_modules/
        }]
    },
    resolve: {
        alias: {
            //别名，很重要，否则无法识别.vue文件，会报错
          vue: 'vue/dist/vue.js'
        }
    },
    devtool: 'inline-source-map', // 用于标记编译后的文件与编译前的文件对应位置，便于调试
    plugins: [
        //引入HMR模块
      new webpack.HotModuleReplacementPlugin(),
      //这个插件将为您生成一个HTML5文件，该文件的 body 中使用script 标记引用了所有 webpack bundle
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'setup.html'), // 写上模板文件
        chunks: ['setup'],
        inject: 'body' // js的script注入到body底部
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'), // 写上模板文件
        chunks: ['index'],
        inject: 'body' // js的script注入到body底部
      })
    ]
  })

