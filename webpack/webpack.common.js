const path = require('path')
const srcDir = path.join(__dirname, '..', 'src')

module.exports = {
  entry: {
    popup: path.join(srcDir, 'popup.tsx'),
    background: path.join(srcDir, 'background.ts'),
  },
  output: {
    path: path.join(__dirname, '../release/js'),
    filename: '[name].js',
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks(chunk) {
        return chunk.name !== 'background'
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
}
