import * as path from 'path'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as Webpack from 'webpack'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import VueLoaderPlugin from 'vue-loader/dist/plugin'

export function fromSrc(p: string) {
  return path.resolve(__dirname, '../../src/popup', p)
}

export default {
  entry: {
    popup: '../../src/popup'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  context: path.resolve(__dirname, '../../src/popup'),
  module: {
    rules: [
      // {
      //   test: /\.css|scss$/,
      //   use: [
      //     {
      //       loader: MiniCssExtractPlugin.loader
      //     },
      //     'style-loader',
      //     'css-loader',
      //     'sass-loader'
      //   ]
      // },
      {
        test: /\.css|scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.ts|.tsx$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            ts: 'ts-loader',
            tsx: 'babel-loader!ts-loader'
          }
        }
      },
      {
        test: /\.png|jpg|gif|jpeg|svg/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'images/[base]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './assets',
          to: './assets'
        },
        { from: path.resolve(__dirname, '../../static'), to: './' }
      ]
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    plugins: [new TsconfigPathsPlugin()]
  }
} as Webpack.Configuration
