var {CleanWebpackPlugin} = require('clean-webpack-plugin')
var miniCssExtractPlugin = require('mini-css-extract-plugin')
var htmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
module.exports = {
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'index.js'
    },
    mode:'development',
    module:{
        rules:[
            {
                test:/\.(sa|sc|c)ss$/,
                use:[
                    {
                        loader: miniCssExtractPlugin.loader,
                        options: {
                          hmr: process.env.NODE_ENV === 'development',
                        },
                      },
                      'css-loader',
                      {
                        loader: "postcss-loader",
                        options:{
                            plugins:[
                                require('autoprefixer')('last 100 versions')
                            ]
                        }
                       },
                      'sass-loader',
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                use:
                   {
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                   }
            },
            {
                test:/\.(jpg|png|gif|webp|svg|jpeg|)$/,
                loader:'file-loader'
            },
            {
                // 自动刷新index.html
                test:/\.html$/,
                loader:'raw-loader'
            }
        ]
    },
    devServer:{
         port:9000,
         contentBase:path.resolve(__dirname,'dist'),
         compress:true,
         hot:true
    },
    plugins:[
        new miniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new htmlWebpackPlugin({
            template:'./index.html',
            hash:true
        }),
        new CleanWebpackPlugin()
    ]
}