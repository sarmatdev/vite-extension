import merge from 'webpack-merge'
import { resolve } from 'path'
import common from './common'
import { fromSrc } from './common'

export default merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  entry: {
    background: [fromSrc('/background/index.ts')],
    popup: fromSrc('/popup/index.ts'),
    'content-script': fromSrc('/content/index.ts')
  },
  output: {
    path: resolve('./dist'),
    pathinfo: false,
    filename: '[name].js'
  }
})
