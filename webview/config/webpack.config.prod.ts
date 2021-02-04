import Merge from 'webpack-merge'
import BaseConfig from './webpack.config.base'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { Configuration, WebpackPluginInstance } from 'webpack'
import { resolve } from 'path'
import TerserPlugin from 'terser-webpack-plugin'

const config = {
    entry: {
        index: resolve(__dirname, '../src/index.tsx')
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false }) as unknown as WebpackPluginInstance]
    }
} as Configuration

export default Merge(BaseConfig, config)