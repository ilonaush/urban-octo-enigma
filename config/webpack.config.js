const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const meowChunkCompositionPlugin = require('meow-chunk-composition');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

const cssRegex = /\.css$/;
const stylusRegex = /\.styl$/;

module.exports = function () {

    const publicPath = isDev ? '/' : paths.servedPath;

    const shouldUseRelativeAssetPaths = publicPath === './';
    const publicUrl = isDev ? '' : publicPath.slice(0, -1);

    const env = getClientEnvironment(publicUrl);

    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            isDev && require.resolve('style-loader'),
            isProd &&
            {
                loader: MiniCssExtractPlugin.loader,
                options: Object.assign(
                    {},
                    shouldUseRelativeAssetPaths ? {publicPath: '../../'} : undefined
                ),
            },
            {
                loader: require.resolve('css-loader'),
                options: cssOptions,
            },
        ].filter(Boolean);

        if (preProcessor) {
            loaders.push({
                loader: require.resolve(preProcessor),
                options: {
                    sourceMap: isProd,
                },
            });
        }

        return loaders;
    };

    return {
        mode: isDev ? 'development' : 'production',
        bail: isProd,
        devtool: isProd ? 'source-map' : 'cheap-module-source-map',
        entry: {
            main: paths.appIndexJs,
        },
        watch: true,
        output: {
            path: undefined,
            pathinfo: isDev,
            filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js',
            chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[chunkhash:8].chunk.js',
            publicPath: publicPath,
            devtoolModuleFilenameTemplate:
                (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
        },
        optimization:
            Object.assign({},
                {minimize: isProd},
                isProd && {
                    minimizer: [
                        new TerserPlugin({
                            terserOptions: {
                                parse: {
                                    ecma: 8,
                                },
                                compress: {
                                    ecma: 5,
                                    warnings: false,

                                    comparisons: false,

                                    inline: 2,
                                },
                                mangle: {
                                    safari10: true,
                                },
                                output: {
                                    ecma: 5,
                                    comments: false,

                                    ascii_only: true,
                                },
                            },

                            parallel: true,
                            cache: true,
                            sourceMap: isProd,
                        }),
                        new OptimizeCSSAssetsPlugin({
                            cssProcessorOptions: {
                                parser: safePostCssParser,
                                map: isProd
                                    ? {
                                        inline: false,
                                        annotation: true,
                                    }
                                    : false,
                            },
                        }),
                    ]
                },
                {
                    splitChunks: {
                        chunks: 'all',
                        name: true,
                        minChunks: 1,
                        automaticNameDelimiter: '-',
                        cacheGroups: {
                            vendors: {
                                test: /[\\/]node_modules[\\/]/,
                                name: 'vendors',
                                chunks: 'all',
                                reuseExistingChunk: true
                            },
                            test: {
                                test: /\.test\./,
                                name: 'unit-testing',
                                chunks: 'all',
                                priority: 2,
                                enforce: true
                            },
                            addCatForm: {
                                test: /AddCat/,
                                name: 'add-cat',
                                chunks: 'async',
                                priority: 2,
                                enforce: true
                            },
                            FindHomeForm: {
                                test: /FindHome/,
                                name: 'find-home',
                                chunks: 'async',
                                priority: 2,
                                enforce: true
                            },
                            gallery: {
                                test: /Gallery/,
                                name: 'gallery',
                                chunks: 'async',
                                priority: 1,
                                enforce: true
                            },
                            List: {
                                test: /List/,
                                name: 'list',
                                chunks: 'async',
                                priority: 1,
                                enforce: true
                            },
                            default: {
                                name: 'shared',
                                minChunks: 2,
                            }
                        }
                    },
                    runtimeChunk: false,
                }
            ),
        resolve: {
            modules: [
                paths.appJs,
                paths.appFonts,
                paths.appComponents,
                paths.appImages,
                'node_modules'].concat(
                process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
            ),
            extensions: paths.moduleFileExtensions
                .map(ext => `.${ext}`),
            alias: {
                'react-native': 'react-native-web',
                'js': paths.appJs,
                'fonts': paths.appFonts,
                'components': paths.appComponents,
                'images': paths.appImages
            },
            plugins: [
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        devServer: {
            compress: true,
            inline: true,
            contentBase: [paths.appPublic, paths.appSrc],
            watchContentBase: true,
            hot: true,
            publicPath: '/',
            https: false,
            host: 'localhost',
            port: 3000,
            overlay: true,
            disableHostCheck: true,
            historyApiFallback: {
                disableDotRule: true,
            },
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    parser:
                        {
                            requireEnsure: false
                        }
                },
                {
                    test: /\.(js|mjs|jsx)$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                formatter: require.resolve('react-dev-utils/eslintFormatter'),
                                eslintPath: require.resolve('eslint'),

                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: paths.appSrc,
                },
                {
                    oneOf: [

                        {
                            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                            loader: require.resolve('url-loader'),
                            options: {
                                limit: 10000,
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                        {
                            test: /\.(js|mjs|jsx|ts|tsx)$/,
                            include: paths.appSrc,
                            loader: require.resolve('babel-loader'),
                            options: {
                                customize: require.resolve(
                                    'babel-preset-react-app/webpack-overrides'
                                ),

                                plugins: [
                                    [
                                        require.resolve('babel-plugin-named-asset-import'),
                                        {
                                            loaderMap: {
                                                svg: {
                                                    ReactComponent:
                                                        '@svgr/webpack?-prettier,-svgo![path]',
                                                },
                                            },
                                        },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: isProd,
                                compact: isProd,
                            },
                        },
                        {
                            test: /\.(js|mjs)$/,
                            exclude: /@babel(?:\/|\\{1,2})runtime/,
                            loader: require.resolve('babel-loader'),
                            options: {
                                babelrc: false,
                                configFile: false,
                                compact: false,
                                presets: [
                                    [
                                        require.resolve('babel-preset-react-app/dependencies'),
                                        {helpers: true},
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: isProd,

                                sourceMaps: false,
                            },
                        },

                        {
                            test: cssRegex,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: isProd,
                            }),
                            sideEffects: true,
                        },
                        {
                            test: stylusRegex,
                            use: getStyleLoaders({importLoaders: 2}, 'stylus-loader', 'resolve-url-loader')
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                            options: {
                                name: 'static/media/[name].[hash:8].[ext]',
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: paths.appHtml,
                    },
                    isProd && {
                        minify: {
                            removeComments: true,
                            collapseWhitespace: true,
                            removeRedundantAttributes: true,
                            useShortDoctype: true,
                            removeEmptyAttributes: true,
                            removeStyleLinkTypeAttributes: true,
                            keepClosingSlash: true,
                            minifyJS: true,
                            minifyCSS: true,
                            minifyURLs: true,
                        },
                    }
                )
            ),
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/,
                /uk/),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new ModuleNotFoundPlugin(paths.appPath),
            new meowChunkCompositionPlugin(),
            new webpack.DefinePlugin(env.stringified),
            isProd && new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            isDev && new webpack.HotModuleReplacementPlugin(),
            isDev && new CaseSensitivePathsPlugin(),
            isDev && new WatchMissingNodeModulesPlugin(paths.appNodeModules),
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: publicPath,
            }),
            isDev && new CopyWebpackPlugin([{from: paths.appImages, to: paths.appStatic}]),
            isProd && new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /asset-manifest\.json$/],
                importWorkboxFrom: 'cdn',
                navigateFallback: publicUrl + '/index.html',
                navigateFallbackBlacklist: [
                    new RegExp('^/_'),
                    new RegExp('/[^/]+\\.[^/]+$'),
                ],
            }),
            isProd && new CleanWebpackPlugin(['build'])
        ].filter(Boolean),
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        performance: false,
    }
};

