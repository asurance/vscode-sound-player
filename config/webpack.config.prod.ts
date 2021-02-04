import Merge from 'webpack-merge'
import BaseConfig from './webpack.config.base'
import { Configuration } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const config = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ],
} as Configuration

export default Merge(BaseConfig, config)