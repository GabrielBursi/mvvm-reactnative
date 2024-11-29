module.exports = {
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@/hooks': './src/hooks',
					'@/models': './src/models',
					'@/providers': './src/providers',
					'@/screens': './src/screens',
					'@/services': './src/services',
					'@/tests': './src/tests',
					'@/viewmodels': './src/viewmodels',
					'@/views': './src/views',
				},
			},
		],
		[
			'react-native-reanimated/plugin',
			{
				relativeSourceLocation: true,
			},
		],
	],
}
