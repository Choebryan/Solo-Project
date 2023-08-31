const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');


module.exports = {

    entry: './client/index.js',

    output: {
        path: path.join(__dirname, '/dist'),
        publicPath: '/',
        filename: 'bundle.js',
    },

    mode: process.env.NODE_ENV,

    devtool: 'eval-source-map',

    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 8080,
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:3000/',
                secure: false,
              },
            '/library': {
                target: 'http://localhost:3000/',
                secure: false,
            }
        },
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './client/index.html',
        })
    ],
    
    
    
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /.(css|scss)$/, // Look for styles (CSS or SCSS)
                exclude: /node_modules/, // Don't include some special files
                use: ['style-loader', 'css-loader', 'sass-loader'], // Use these tools for styles
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
}