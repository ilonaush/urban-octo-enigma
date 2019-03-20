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
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
    bail: isProd, //Fail out on the first error instead of tolerating it.
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    entry: {
      main: paths.appIndexJs,
    },
    // context: path.resolve(__dirname, '../'), //The base directory, an absolute path, for resolving entry points and loaders from configuration.
    // By default the current directory is used, but it's recommended to pass a value in your configuration.
    // This makes your configuration independent from CWD (current working directory).
    watch: false,
    output: {
      path: path.resolve(__dirname, '../build'),
      pathinfo: isDev, //tells webpack to include comments in bundles with information about the contained modules.
      filename: isDev ? 'static/js/[name].js' : 'static/js/[name].[chunkhash:8].js',
      chunkFilename: isDev ? 'static/js/[name].chunk.js' : 'static/js/[name].[chunkhash:8].chunk.js',
      publicPath: publicPath // It allows you to specify the base path for all the assets within your application,
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

                  parallel: true, //Use multi-process parallel running to improve the build speed.,
                  cache: true,
                  sourceMap: isProd,
                }),
                new OptimizeCSSAssetsPlugin({
                  cssProcessorOptions: {
                    // parser: safePostCssParser,
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
                minChunks: 1, //Minimum number of chunks that must share a module before splitting.
                automaticNameDelimiter: '-',
                cacheGroups: { //Cache groups can inherit and/or override any options from splitChunks.*; but test, priority and reuseExistingChunk can only be configured on cache group level.
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
                  History: {
                    test: /History/,
                    name: 'history',
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
                    minChunks: 1,
                  }
                }
              },
              runtimeChunk: false //adds an additional chunk to each entrypoint containing only the runtime,
            }
        ),
    resolve: {
      modules: [ //Tell webpack what directories should be searched when resolving modules.
        paths.appJs,
        paths.appFonts,
        paths.appComponents,
        paths.appImages,
        'node_modules'].concat(
          process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
      ),
      extensions: paths.moduleFileExtensions
          .map(ext => `.${ext}`), //Automatically resolve certain extensions which is what enables users to leave off the extension when importing
      alias: { //Create aliases to import or require certain modules more easily.
        'react-native': 'react-native-web',
        'js': paths.appJs,
        'fonts': paths.appFonts,
        'components': paths.appComponents,
        'images': paths.appImages
      },
      plugins: [ //A list of additional resolve plugins which should be applied.
        new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]), // prevents me from importing smth that falls outside of /src.
      ],
    },
    devServer: {
      compress: true, //Enable gzip compression for everything served:
      inline: true, //Toggle between the dev-server's two different modes. This means that a script will be inserted in your bundle to take care of live reloading, and build messages will appear in the browser console.
      contentBase: [paths.appPublic, paths.appSrc], //Tell the server where to serve content from
      watchContentBase: true, //Tell dev-server to watch the files served by the devServer.contentBase option. It is disabled by default. When enabled, file changes will trigger a full page reload.
      hot: true,
      publicPath: '/', //The bundled files will be available in the browser under this path.
      https: false,
      host: 'localhost',
      port: 3000,
      overlay: true,
      disableHostCheck: false, //When set to true this option bypasses host checking. THIS IS NOT RECOMMENDED as apps that do not check the host are vulnerable to DNS rebinding attacks.
      historyApiFallback: { //When using the HTML5 History API, the index.html page will likely have to be served in place of any 404 responses.
        disableDotRule: false, //useful for Angular
      },
    },
    module: { //how the different types of modules within a project will be treated.
      strictExportPresence: true, //strictExportPresence makes missing exports an error instead of warning
      rules: [ //An array of Rules which are matched to requests when modules are created. These rules can modify how the module is created. They can apply loaders to the module, or modify the parser.
        {
          parser: //An object with parser options. All applied parser options are merged.
              {
                requireEnsure: false //disable require.ensure
              }
        },
        {
          test: /\.(js|mjs|jsx)$/,
          enforce: 'pre', //Specifies the category of the loader.
          use: [ //Rule.use can be an array of UseEntry which are applied to modules. Each entry specifies a loader to be used.
            {
              options: {
                eslintPath: require.resolve('eslint'),
              },
              loader: require.resolve('eslint-loader'),
            },
          ],
          include: paths.appSrc, //A Condition matched with the resource.
        },
        {
          oneOf: [ //An array of Rules from which only the first matching Rule is used when the Rule matches.

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
                // customize: require.resolve(
                //     'babel-preset-react-app/webpack-overrides'
                // ),

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
              sideEffects: true, //An array of Rules from which only the first matching Rule is used when the Rule matches.
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
      isProd && new CleanWebpackPlugin(),
      isProd && new BundleAnalyzerPlugin({ //not closing process!!
        openAnalyzer: false,
        analyzerMode: "disabled",
        generateStatsFile: true
      })

    ].filter(Boolean),
    node: { //This is an object where each property is the name of a Node global or module and each value may be one of the following...
      dgram: 'empty', //Provide an empty object.
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    performance: { //Configure how performance hints are shown. For example if you have an asset that is over 250kb, webpack will emit a warning notifying you of this
      hints: 'warning'
    },
  }
};

