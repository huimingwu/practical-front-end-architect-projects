const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const minify = require('html-minifier').minify;
//建议使用全路劲
const path = require("path");
module.exports ={
    output:{
        filename:"scripts/[name].[hash:5].bundle.js"
    },
    plugins: [
        //处理views模板
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/views/common/layout.html"),
            to:'../views/common/layout.html'
        }]),
        //处理components模板
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/components/"),
            to:'../components',
            transform(content){
                return minify(content.toString("utf-8"),{
                    collapseWhitespace:true
                });
                
            }
        }],{
            ignore:["*.js","*.css","*.ts","*.png","*.DS_STORE"]
        }),
        new ExtractTextPlugin({
            filename:"styles/[name].[hash:5].css"
            ,
            allChunks:true
        }),
      ]
    
}