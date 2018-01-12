var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry:{
        main: './src/main.js',
        setup: './src/setup.js'
    },
    output:{
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        //出口文件打包后有两个，不再是bundle.js，而是main.js和setup.js
        filename: '[name].js'
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
			exclude:/node_modules/,
			query:{
				//此处对babel的配置本应存在于.babelrc中,现写在配置js loader的query参数中
				//此处对presets预置属性的配置分别支持es6和es7
				"presets":['es2015','stage-0'],
				//在转换 ES2015 语法为 ECMAScript 5 的语法时，babel 会需要一些辅助函数，例如 _extend。
				//babel 默认会将这些辅助函数内联到每一个 js 文件里，这样文件多的时候，项目就会很大。
		       //所以 babel 提供了 transform-runtime 来将这些辅助函数“搬”到一个单独的模块 babel-runtime 中
		       //这样做能减小项目文件的大小。
				"plugins":['transform-runtime']
			}
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
    }
}