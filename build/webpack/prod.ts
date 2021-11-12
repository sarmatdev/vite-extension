import merge from 'webpack-merge'
import common from './common'

export default merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map'
})
