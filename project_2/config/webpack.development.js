const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
//建议使用全路劲
const path = require("path");
module.exports ={
    plugins: [
        new LiveReloadPlugin({}),
        //处理views模板
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/views/common/layout.html"),
            to:'../views/common/layout.html'
        }]),
        //处理components模板
        new CopyWebpackPlugin([{
            from:path.join(__dirname,"../"+"/src/webapp/components/"),
            to:'../components'
        }],{
            copyUnmodified:true,
            ignore:["*.js","*.css","*.ts","*.png","*.DS_STORE"]
        }),
        new ExtractTextPlugin({
            filename:(getPath)=>{
                return getPath("styles/[name].css")
            }
            ,
            allChunks:true
        }),
      ]
    
}