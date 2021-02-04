import Merge from 'webpack-merge'
import BaseConfig from './webpack.config.base'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { Configuration } from 'webpack'
import { resolve } from 'path'

const config = {
    entry: {
        index: resolve(__dirname, '../src/index.tsx')
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin()
    ]
} as Configuration

export default Merge(BaseConfig, config)