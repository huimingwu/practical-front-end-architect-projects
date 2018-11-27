const argv = require("yargs-parser")(process.argv.slice(2));
const merge = require("webpack-merge");
const mode = argv.mode || "development";
const _modeflag = (mode == "production" ? true : false);
const _mergeConfig = require(`./config/webpack.${mode}.js`);
const glob = require("glob");
let _entry = {}; //空的入口文件
let _plugins = [];
const {
    join
} = require('path');
const files = glob.sync("./src/webapp/views/**/*.entry.ts");
const HappyWebpackPlugin = require('./config/happyWebpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin = require("./config/htmlAfterWebpackPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
for (let item of files) {
    //index-index.entry.ts
    if (/.+\/([a-zA-Z]+-[a-zA-Z]+)(\.entry\.ts$)/g.test(item) == true) {
        const entryKey = RegExp.$1;
        _entry[entryKey] = item;
        const [dist, template] = entryKey.split('-');
        _plugins.push(new HtmlWebpackPlugin({
            filename: `../views/${dist}/pages/${template}.html`,
            template: `src/webapp/views/${dist}/pages/${template}.html`,
            inject: false,
            //保证页面没有其他的js
            chunks: ["runtime", entryKey],
            minify: {
                collapseWhitespace: _modeflag,
                removeAttributeQuotes: _modeflag
            }
        }));
    }
}
let webpackConfig = {
    entry: _entry,
    module: {
        rules: [{
                test: /\.ts?$/,
                exclude: /node_modules/,
                use: 'happypack/loader?id=happyTS'

            },
            {
                test: /\.css?$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'happypack/loader?id=happyCSS'
                })

            }
        ]
    },
    watch: !_modeflag,
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    optimization: {
        runtimeChunk: {
            name: "runtime"
        },
        splitChunks: {
            chunks: "async",
            minChunks: 2,
            cacheGroups: {
                commons: {
                    minChunks: 2,
                    minSize: 0,
                    name: "commons"
                }
            }
        }
    },
    plugins: [
        ..._plugins,
        ...HappyWebpackPlugin,
        new HtmlAfterWebpackPlugin()
    ],
    resolve: {
        extensions: ['ts', '.css']
    }
}
module.exports = merge(webpackConfig, _mergeConfig);