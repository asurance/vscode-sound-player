import Merge from 'webpack-merge'
import BaseConfig from './webpack.config.base'
import { Configuration } from 'webpack'

const config = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
} as Configuration

export default Merge(BaseConfig, config)