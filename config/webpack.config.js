'use strict';
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const path = require('path');
const webpack = require('webpack');
const PnpWebpackPlugin = require('pnp-webpack-plugin');
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

const cssRegex = /\.css$/;
const stylusRegex = /\.styl$/;

module.exports = function() {

  const publicPath = '/';
  const publicUrl = '';
  const env = getClientEnvironment(publicUrl);

  const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
      require.resolve('style-loader'),
      {
        loader: require.resolve('css-loader'),
        options: cssOptions,
      },
    ].filter(Boolean);

    if (preProcessor) {
      loaders.push({
        loader: require.resolve(preProcessor),
        options: {
          sourceMap: false,
        },
      });
    }
    return loaders;
  };

  const routeEntries = {
    root: path.resolve(__dirname, '../src/js/index.js'),
  };

  return {
    mode: 'development',
    bail: false,
    devtool: 'cheap-module-source-map',
    entry: {
      main: paths.appIndexJs,
    },
    watch: true,
    output: {
      path:  undefined,
      pathinfo: true,
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].chunk.js',
      publicPath: publicPath,
      devtoolModuleFilenameTemplate:
          (info => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    },
    optimization: {
      minimize: false,
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
        { parser:
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
                cacheCompression: false,
                compact: false,
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
                cacheCompression: false,

                sourceMaps: false,
              },
            },

            {
              test: cssRegex,
              use: getStyleLoaders({
                importLoaders: 1,
                sourceMap: false,
              }),
              sideEffects: true,
            },
            {
              test: stylusRegex,
              use: getStyleLoaders({ importLoaders: 2 }, 'stylus-loader', 'resolve-url-loader')
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
        )
      ),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      new ModuleNotFoundPlugin(paths.appPath),
      new meowChunkCompositionPlugin(),
      new webpack.DefinePlugin(env.stringified),
      new webpack.HotModuleReplacementPlugin(),
      new CaseSensitivePathsPlugin(),
      new WatchMissingNodeModulesPlugin(paths.appNodeModules),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
        publicPath: publicPath,
      }),
      new CopyWebpackPlugin([{from: paths.appImages, to: paths.appStatic}])
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
