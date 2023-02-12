const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../release/firefox/js'),
    filename: '[name].js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './public',
          to: ({ absoluteFilename }) => {
            if (absoluteFilename.endsWith('firefox.json')) {
              return path.join(__dirname, '../release/firefox') + '/manifest.json'
            } else {
              return path.join(__dirname, '../release/firefox') + '/[name][ext]'
            }
          },
        },
      ],
    }),
  ],
})
