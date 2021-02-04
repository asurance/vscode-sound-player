import { resolve } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const config = {
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        compilerOptions: {
                            module: 'es6',
                        },
                        transpileOnly: true,
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: true,
                            modules: {
                                namedExport: true,
                            },
                        },
                    },]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'sound player', template: resolve(__dirname, '../index.html') }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.tsx']
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, '../../public'),
    }
} as Configuration

export default config