import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import * as fs                    from 'fs-extra'
import HtmlWebpackPlugin          from 'html-webpack-plugin'
import MiniCssExtractPlugin       from 'mini-css-extract-plugin'
import * as path                  from 'path'
import stripJsonComments          from 'strip-json-comments'
import * as webpack               from 'webpack'
import { BundleAnalyzerPlugin }   from 'webpack-bundle-analyzer'
import config                     from '../config'
import excludeFor                 from './configs/exclude'
import lodashPlugin               from './configs/lodash'
import { sassLoader, scssLoader } from './configs/sass'

const SIZE_14KB = 14336

// See https://github.com/vuejs/vue-loader/issues/678#issuecomment-370965224
const babelrc = JSON.parse(stripJsonComments(fs.readFileSync(path.join(__dirname, '../../.babelrc'), 'utf-8')))


const prodConf: webpack.Configuration = {

  mode: 'production',

  context: config.absSource(''),

  profile: true,

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions : ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json'],
    mainFields: ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
  },

  output: {
    path         : config.absOutput(''),
    publicPath   : '',
    filename     : 'assets/[name]-[chunkHash].js',
    chunkFilename: 'assets/[name]-[chunkHash].chunk.js',
    globalObject : 'self',
  },

  module: {
    rules: [
      {
        test   : /\.html$/,
        exclude: /node_modules/,
        use    : ['html-loader?interpolate'],
      },
      {
        test   : /\.tsx?$/,
        exclude: excludeFor('ts'),
        use    : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
          {
            loader : 'ts-loader',
            options: {
              transpileOnly: true,
              configFile   : config.absRoot('tsconfig.json'),
            },
          },
        ],
      },
      {
        test   : /\.jsx?$/,
        include: [
          config.absSource(),
        ],
        use    : [
          {
            loader : 'babel-loader',
            options: babelrc,
          },
        ],
      },
      {
        test: /\.css$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              importLoaders: 3,
            },
          },
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              importLoaders: 3,
            },
          },
          'postcss-loader',
          'resolve-url-loader?keepQuery',
          scssLoader,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              // limit for base64 inlining in bytes
              limit   : SIZE_14KB,
              // custom naming format if file is larger than
              // the threshold
              name    : '[hash].[ext]',
              fallback: 'file-loader?outputPath=assets&publicPath=./',
            },
          },
        ],
      },
    ],
  },

  node: {
    __dirname : true,
    __filename: true,
  },

  plugins: [
    lodashPlugin,
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ROUTER_BASE: config.base,
      },
    }),
    new BundleAnalyzerPlugin({
      analyzerMode  : 'static',
      defaultSizes  : 'gzip',
      openAnalyzer  : false,
      reportFilename: config.absRoot('test_results/bundle-analysis-report.html'),
    }),
    new MiniCssExtractPlugin({
      filename     : 'assets/[name]-[chunkHash].css',
      chunkFilename: 'assets/[name]-[chunkHash].chunk.css',
    }),
    new HtmlWebpackPlugin({
      filename      : 'index.html',
      template      : './index.html',
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
    }),
  ],
}

export default prodConf
