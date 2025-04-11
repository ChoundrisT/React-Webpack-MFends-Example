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
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
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
         name: 'app_shell',
         filename: 'remoteEntry.js',
         remotes: {
           app1: 'app1@http://localhost:3001/remoteEntry.js',
         },
         exposes: {
         },
         shared: {
         //   ...deps,
           '@material-ui/core': {
             singleton: true,
           },
           'react-router-dom': {
             singleton: true,
             eager:true
           },
           react: {
            singleton: true,
            requiredVersion: '^18.2.0', 
            eager: true, 
            },
            "react-dom": {
               singleton: true,
               requiredVersion: '^18.2.0',
               eager: true,
            },
            },
       }),
   ],
   devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),  
      },
      compress: true,
      port: 3000,  
      watchFiles: ['src/**/*', 'public/**/*'],  
      hot: true,  
      open: true,  
   },
   mode: 'development', 
};
