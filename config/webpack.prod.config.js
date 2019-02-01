'use strict';
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
// const meowChunkCompositionPlugin = require('meow-chunk-composition');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const shouldInlineRuntimeChunk = process.env.INLINE_RUNTIME_CHUNK !== 'false';

const cssRegex = /\.css$/;
const stylusRegex = /\.styl$/;

module.exports = function() {

    const publicPath = paths.servedPath;

    const shouldUseRelativeAssetPaths = publicPath === './';

    const publicUrl = publicPath.slice(0, -1);

    const env = getClientEnvironment(publicUrl);

    const getStyleLoaders = (cssOptions, preProcessor) => {
        const loaders = [
            {
                loader: MiniCssExtractPlugin.loader,
                options: Object.assign(
                    {},
                    shouldUseRelativeAssetPaths ? { publicPath: '../../' } : undefined
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
                    sourceMap: shouldUseSourceMap,
                },
            });
        }
        return loaders;
    };

    const routeEntries = {
        root: path.resolve(__dirname, '../src/js/index.js'),
    };

    return {
        mode: 'production',
        bail: true,
        devtool: shouldUseSourceMap ? 'source-map' : false,
        entry: {
            main: paths.appIndexJs,
        },
        output: {
            path: paths.appBuild,
            pathinfo: false,
            filename: 'static/js/[name].[chunkhash:8].js',
            chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
            publicPath: publicPath,
            // Point sourcemap entries to original disk location (format as URL on Windows)
            devtoolModuleFilenameTemplate: info =>
                path
                    .relative(paths.appSrc, info.absoluteResourcePath)
                    .replace(/\\/g, '/')
            ,
        },
        optimization: {
            minimize: true,
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
                    sourceMap: shouldUseSourceMap,
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        map: shouldUseSourceMap
                            ? {
                                inline: false,
                                annotation: true,
                            }
                            : false,
                    },
                }),
            ],

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
                        priority: 3,
                        enforce: true
                    },
                    addWorkerForm: {
                        test: /AddWorker/,
                        name: 'add-worker',
                        chunks: 'async',
                        priority: 2,
                        enforce: true
                    },
                    fireWorkerForm: {
                        test: /FireWorker/,
                        name: 'fire-worker',
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
        },
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
                'js' : paths.appJs,
                'fonts': paths.appFonts,
                'components': paths.appComponents,
                'images': paths.appImages
            },
            plugins: [
                new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
            ],
        },
        resolveLoader: {
            plugins: [
                PnpWebpackPlugin.moduleLoader(module),
            ],
        },
        module: {
            strictExportPresence: true,
            rules: [
                { parser: { requireEnsure: false } },

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
                                cacheCompression: true,
                                compact: true,
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
                                        { helpers: true },
                                    ],
                                ],
                                cacheDirectory: true,
                                cacheCompression: true,

                                sourceMaps: false,
                            },
                        },

                        {
                            test: cssRegex,
                            use: getStyleLoaders({
                                importLoaders: 1,
                                sourceMap: shouldUseSourceMap,
                            }),
                            sideEffects: true,
                        },
                        {
                            test: stylusRegex,
                            use: getStyleLoaders({ importLoaders: 2 }, 'stylus-loader', 'resolve-url-loader')
                        },
                        {
                            loader: require.resolve('file-loader'),
                            exclude: [/\.(js|mjs|jsx|ts|tsx|snap)$/, /\.html$/, /\.json$/],
                            options: {
                                name: `static/media/[name].[hash:8].[ext]`,
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(['build']),
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: paths.appHtml,
                    },
                    {
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
            shouldInlineRuntimeChunk &&
            new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime~.+[.]js/]),
            new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
            new ModuleNotFoundPlugin(paths.appPath),
            // new meowChunkCompositionPlugin(),
            new webpack.DefinePlugin(env.stringified),
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
            }),
            new ManifestPlugin({
                fileName: 'asset-manifest.json',
                publicPath: publicPath,
            }),
            new WorkboxWebpackPlugin.GenerateSW({
                clientsClaim: true,
                exclude: [/\.map$/, /asset-manifest\.json$/],
                importWorkboxFrom: 'cdn',
                navigateFallback: publicUrl + '/index.html',
                navigateFallbackBlacklist: [
                    new RegExp('^/_'),
                    new RegExp('/[^/]+\\.[^/]+$'),
                ],
            }),
        ].filter(Boolean),

        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty',
        },
        performance: false,
    };
};
