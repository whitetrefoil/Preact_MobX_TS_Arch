import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import * as fs                    from 'fs-extra';
import HtmlWebpackPlugin          from 'html-webpack-plugin';
import * as path                  from 'path';
import stripJsonComments          from 'strip-json-comments';
import * as webpack               from 'webpack';
import config                     from '../config';
import excludeFor                 from './configs/exclude';
import lodashPlugin               from './configs/lodash';
import { sassLoader, scssLoader } from './configs/sass';


const SIZE_14KB = 14336;

// See https://github.com/vuejs/loader/issues/678#issuecomment-370965224
const babelrc = JSON.parse(stripJsonComments(fs.readFileSync(path.join(__dirname, '../../.babelrc'), 'utf-8')));


const devConfig: webpack.Configuration = {

  mode: 'development',

  devtool: 'source-map',

  context: config.absSource(''),

  entry: {
    index: ['./polyfills', './index'],
  },

  resolve: {
    extensions : ['.tsx', '.ts', '.jsx', '.mjs', '.js', '.json'],
    mainFields : ['webpack', 'jsnext:main', 'module', 'browser', 'web', 'browserify', 'main'],
    unsafeCache: false,
  },

  output: {
    path         : config.absBuilding(''),
    publicPath   : '',
    filename     : 'assets/[name].js',
    chunkFilename: 'assets/[name].chunk.js',
    globalObject : 'self',
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test   : /\.[jt]s$/,
        use    : ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test   : /\.ts$/,
        use    : ['tslint-loader'],
        exclude: /node_modules/,
      },
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
        test   : /\.jsx$/,
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
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              sourceMap    : true,
              importLoaders: 1,
            },
          },
          'postcss-loader?sourceMap',
        ],
      },
      {
        test: /\.sass$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              sourceMap    : true,
              importLoaders: 3,
            },
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          sassLoader,
        ],
      },
      {
        test: /\.scss$/,
        use : [
          'style-loader',
          {
            loader : 'css-loader',
            options: {
              sourceMap    : true,
              importLoaders: 3,
            },
          },
          'postcss-loader?sourceMap',
          'resolve-url-loader?sourceMap',
          scssLoader,
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)(\?\S*)?$/,
        use : [
          {
            loader : 'url-loader',
            options: {
              limit   : SIZE_14KB,
              name    : '[name].[ext]',
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
    // Refer to: https://github.com/lodash/lodash-webpack-plugin
    lodashPlugin,
    new ForkTsCheckerWebpackPlugin({
      tsconfig: config.absRoot('tsconfig.json'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ROUTER_BASE: config.base,
      },
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
};

export default devConfig;
