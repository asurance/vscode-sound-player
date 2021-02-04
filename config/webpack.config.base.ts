import { resolve } from 'path'
import { Configuration } from 'webpack'

const config = {
    target: 'node',
    entry: {
        extension: resolve(__dirname, '../src/extension.ts')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            module: 'es6'
                        },
                        transpileOnly: true,
                    },
                }],
            }
        ]
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '../dist'),
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]'
    }
} as Configuration

export default config