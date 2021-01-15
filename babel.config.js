module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          _: './src',
        },
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
      process.env.NODE_ENV === 'production' && 'transform-remove-console',
    ].filter(Boolean),
  ],
}
