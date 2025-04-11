const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  cache: false,
  output: {
    // publicPath: 'auto', // Automatically determines the public path
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js', // Use content hash for caching
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  devServer: {
    port: 3001,
    hot: !isProd,
    // publicPath: '/', // Ensure the server serves assets from the root
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react'],
          plugins: [!isProd && 'react-refresh/babel'].filter(Boolean),
        },
      },
    ],
  },
  plugins: [
    !isProd && new ReactRefreshWebpackPlugin(), // Only include in development
    new ModuleFederationPlugin({
      name: 'app1',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button',
      },
      shared: {
        'react': { singleton: true },
        'react-dom': { singleton: true },
        '@material-ui/core': {
          singleton: true,
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html', // Automatically injects script tags
    }),
  ].filter(Boolean),
};
