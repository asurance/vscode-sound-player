import Merge from 'webpack-merge'
import BaseConfig from './webpack.config.base'
import { Configuration, WebpackPluginInstance } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const config = {
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