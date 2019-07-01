const path = require('path')
const HappyPack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'
  return {
    entry: {
      bundle: path.join(__dirname, 'src/index.js'),
      testBundle: path.join(__dirname, 'src/test/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name]-[chunkhash].js'
    },
    resolve: {
      modules: [
        'src',
        'node_modules'
      ],
      extensions: ['.js', '.jsx', '.json'],
      enforceExtension: false,
      alias: {}
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          include: [ path.resolve(__dirname, './src') ],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['transform-runtime', 'transform-decorators-legacy']
            }
          },
        },
/*         {
            test: /\.jsx?$/,
            use: ['happypack/loader?id=happybabel'],
            exclude: /node_modules/,
        }, */
        {
          test: /\.(css|less)$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader'
          ]
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }]
        },
        {
          test: /\.(png|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {}
          }]
        }
      ]
    },
    plugins: [
/*       new HappyPack({
        id: 'happybabel',
        loaders: [{
          loader: 'babel-loader',
          // here you configure babel:
          options: { babelrc: true, cacheDirectory: true }
        }]
      }), */
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, 'src/test/index.html'),
        chunks: ['testBundle']
      }),
      new CleanWebpackPlugin()
    ]
  }
}
