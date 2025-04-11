const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
   entry: './index.jsx',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
   },
   resolve: {
      extensions: ['.js', '.jsx'],
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: 'babel-loader',
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpe?g|gif|svg|webp)$/i,
            type: 'asset/resource',
         },
         {
            test: /\.(woff2?|eot|ttf|otf)$/i,
            type: 'asset/resource',
         },
      ],
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './index.html',
      }),
      new ModuleFederationPlugin({
         runtime: string | false,
       }),
   ],
   devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),  // Directory to serve static files from
      },
      compress: true,
      port: 9000,  
      watchFiles: ['src/**/*', 'public/**/*'],  // Watch these directories for changes
      hot: true,  // Enable Hot Module Replacement (HMR)
      open: true,  // Automatically open the browser when the server starts
   },
   mode: 'development', 
};
