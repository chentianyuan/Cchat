const path = require('path')
const webpack = require('webpack')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin') //自动生成新的html，注入打包后的入口文件，不用手动引入

module.exports = {
    entry:[
		'webpack/hot/dev-server', // 热替换处理入口文件
        path.resolve(__dirname,"src/main.js"),
        path.resolve(__dirname,"src/setup.js")
	],
    output:{
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        //出口文件打包后有两个，不再是bundle.js，而是main.js和setup.js
        filename: '[name].bundle.js'
    },
    resolve:{
        //省略扩展名,首项不能为''
		//使得引入的时候不要加扩展名
		extensions:['*','.js','.vue'],
		alias:{
            //创建别名，使得方便引入
			vue: 'vue/dist/vue.js'
		}
    },
    module:{
        //加载器配置
		loaders:[{
			test:/\.js$/,
			//通过babel转换
			loader:'babel-loader',
			//不用转换node_modules文件夹
			query:{
				//此处对babel的配置本应存在于.babelrc中,现写在配置js loader的query参数中
				//此处对presets预置属性的配置分别支持es6和es7
				"presets":['es2015','stage-0'],
				//在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数，例如 _extend。
				//babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大。
		       //所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中
		       //这样做能减小项目文件的大小。
				"plugins":['transform-runtime']
			},
			exclude:/node_modules/			
		},
		{
			test:/\.vue$/,
			loader:'vue-loader',
			exclude:/node_modules/
		},
		{
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
	},
	devServer:{
		contentBase:path.resolve(__dirname,"dist"),
		historyApiFallback: true,
		noInfo: true,
		inline: true, // 文件改变自动刷新页面
		proxy:{
			'/':{
				target:'http://localhost:3000/'
			}
		}
	},
	plugins: [
		//引入HMR模块
		new webpack.HotModuleReplacementPlugin(),
		//这个插件将为您生成一个HTML5文件，该文件的 body 中使用script 标记引用了所有 webpack bundle
		new HtmlWebpackPlugin({
		  template: path.resolve(__dirname, 'setup.html'), // 写上模板文件
		  filename: 'setup.html',
		  inject: 'body' // js的script注入到body底部
		}),
		new HtmlWebpackPlugin({
		  template: path.resolve(__dirname, 'index.html'), // 写上模板文件
		  filename: 'index.html',
		  inject: 'body' // js的script注入到body底部
		})
	],
	devtool: 'inline-source-map' // 用于标记编译后的文件与编译前的文件对应位置，便于调试
}