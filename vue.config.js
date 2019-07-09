const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {
	productionSourceMap: true,
	// configureWebpack: (config) => {
	// 	if (process.env.NODE_ENV === 'production') {
	// 		// 为生产环境修改配置...
	// 		config.mode = 'production';
	// 		// 将每个依赖包打包成单独的js文件
	// 			config.plugins = [
	// 				...config.plugins,
	// 				new CompressionPlugin({
	// 					test: /\.js$|\.html$|.\css/, //匹配文件名
	// 					threshold: 10240, //对超过10k的数据压缩
	// 					deleteOriginalAssets: false //不删除源文件
	// 				})
	// 			]
	// 	} else {
	// 		// 为开发环境修改配置...
	// 		config.mode = 'development';
	// 	}
	// },
	devServer: {
		proxy: {
			// '/api': {
			// 	// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
			// 	// target: 'http://192.168.1.172:8086/', //对应自己的接口
			// 	target: 'http://192.168.1.174:8086/', //对应自己的接口
			// 	changeOrigin: true,
			// 	ws: true,
			// 	pathRewrite: {
			// 		'^/api': ''
			// 	}
			// },
			'/log': {
				// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
				target: 'http://192.168.1.172:8086/', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/log': ''
				}
			},
			// '/tax': {
			// 	// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
			// 	target: 'http://lt.e9bq.net:8093/', //对应自己的接口
			// 	changeOrigin: true,
			// 	ws: true,
			// 	pathRewrite: {
			// 		'^/tax': ''
			// 	}
			// },
			'/tax': {
				// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
				target: 'http://192.168.1.172:8086/', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/tax': ''
				}
			},
			'/cas': {
				// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
				target: 'http://192.168.1.111:8088/', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/cas': '/cas'
				}
			},
			'/miaoxing': {
				// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
				target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/miaoxing': ''
				}
			},
			'/test': {
				target: ' https://www.easy-mock.com/mock/5cf5cdc4b1f9bc4337c5e5d3/cwsystemtest', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/test': ''
				}
			},
		}
	}
}
