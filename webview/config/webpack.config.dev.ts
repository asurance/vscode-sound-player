import Merge from 'webpack-merge'
import BaseConfig from './webpack.config.base'
import { resolve } from 'path'
import { Configuration } from 'webpack'

const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    index: resolve(__dirname, '../src/debug.tsx'),
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    port: 10086,
  },
} as Configuration

export default Merge(BaseConfig, config)
