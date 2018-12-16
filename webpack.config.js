const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => {
    const devMode = argv.mode === 'development';
    let minifyOptions = false;

    if(!devMode) {
        minifyOptions = {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: false,
            removeStyleLinkTypeAttributes: false,
            useShortDoctype: true
        };
    }

    return {
        entry: './js/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: devMode ? '[name].js' : '[name].[contenthash].js'
        },
        optimization: {
            // usedExports: true, // ESM Tree Shaking, doesn't work with CommonJS mpdules
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader", options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader", options: {
                                ident: 'postcss',
                                sourceMap: true,
                                plugins: loader => {
                                    return devMode ? [
                                        require('postcss-import')({ root: loader.resourcePath }),
                                        require('autoprefixer')()
                                    ] : [
                                        require('postcss-import')({ root: loader.resourcePath }),
                                        require('autoprefixer')(),
                                        require('cssnano')()
                                    ];
                                }
                            }
                        },
                        {
                            loader: "sass-loader", options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            new CleanWebpackPlugin('build'),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                inject: true,
                hash: false,
                minify: minifyOptions,
                template: './index.html',
                filename: 'index.html'
            })
        ],
    }
};