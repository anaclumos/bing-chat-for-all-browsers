const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../release/chrome/js'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: ({ absoluteFilename }) => {
            if (absoluteFilename.endsWith('chrome.json')) {
              return path.join(__dirname, '../release/chrome') + '/manifest.json'
            } else {
              return path.join(__dirname, '../release/chrome') + '/[name][ext]'
            }
          },
        },
      ],
    }),
  ],
})
