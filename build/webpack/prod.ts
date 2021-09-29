import merge from 'webpack-merge'
import { resolve } from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import common from './common'

export default merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: '[name].[contenthash].js',
    path: resolve(__dirname, '../../dist'),
    publicPath: './'
  },
  plugins: [
    // new OptimizeCssAssetsPlugin({
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }]
    //   },
    //   canPrint: true
    // })
  ]
})
