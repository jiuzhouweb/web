module.exports = {
	devServer: {
		proxy: {
			'/api': {
				// target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
				// target: 'http://192.168.1.172:8086/', //对应自己的接口
				target: 'http://192.168.1.174:8086/', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			},
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
		}
	}
}
