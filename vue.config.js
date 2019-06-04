module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'https://www.easy-mock.com/mock/5cf33a4c95043e1122d9eb8f/miaoxing/', //对应自己的接口
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
