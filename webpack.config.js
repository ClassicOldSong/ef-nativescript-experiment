const webpack = require('@nativescript/webpack')

module.exports = (env) => {
	webpack.init(env)

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	webpack.chainWebpack((config) => {
		config.module
			.rule('efml')
			.test(/\.(eft|efml?)$/i)
			.use('eft-loader')
			.loader('eft-loader')
	})

	return webpack.resolveConfig()
}
