const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const theme = process.env.THEME

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
})

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, 'loaders')],
  },
  module: {
    rules: [
      {test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/},
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{loader: 'css-loader'}, {loader: 'sass-loader'}],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.scss?$/,
        loader: 'string-replace-loader',
        options: {
          pattern: 'INJECTED_THEME',
          replacement: () => {
            const theme = process.env['THEME']
            switch (theme) {
              case 'teal':
              default:
                return 'themes/teal'
              case 'salmon':
                return 'themes/salmon'
            }
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.DefinePlugin({
      THEME: JSON.stringify(theme),
    }),
    extractSass,
  ],
}
