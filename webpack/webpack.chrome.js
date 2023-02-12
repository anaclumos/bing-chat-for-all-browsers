const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../dist/chrome/js'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: '.',
          to: ({ absoluteFilename }) => {
            if (absoluteFilename.endsWith('chrome.json')) {
              return 'manifest.json'
            }
            return absoluteFilename
          },
          context: 'public',
        },
      ],
    }),
  ],
})
