import merge from 'webpack-merge'
import * as Webpack from 'webpack'
import common from './common'

export default merge(common, {
  mode: 'development',
  entry: ['webpack-dev-server/client', 'webpack/hot/only-dev-server'],
  devServer: {
    host: 'localhost',
    hot: true,
    port: 8080
  },
  devtool: 'cheap-module-source-map',
  plugins: [new Webpack.HotModuleReplacementPlugin()]
} as Webpack.Configuration)
