import merge from 'webpack-merge'
import { resolve } from 'path'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
import common from './common'

export function fromSrc(p: string) {
  return resolve(__dirname, '../../src', p)
}

export default merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    background: [fromSrc('/background/index.ts')],
    popup: fromSrc('/popup/index.ts'),
    'content-script': fromSrc('/content/index.ts')
    // 'inject-script': './src/content/injectScript.js'
  },
  output: {
    path: resolve('./dist'),
    pathinfo: false,
    filename: '[name].js'
  },
  // output: {
  //   filename: '[name].[contenthash].js',
  //   path: resolve(__dirname, '../../dist'),
  //   publicPath: './'
  // },
  plugins: [
    // new OptimizeCssAssetsPlugin({
    //   cssProcessorPluginOptions: {
    //     preset: ['default', { discardComments: { removeAll: true } }]
    //   },
    //   canPrint: true
    // })
  ]
})
