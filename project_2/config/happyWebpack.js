const HappyWebpack = require('HappyPack');
const os =require("os");
const happyThreadPoll = HappyWebpack.ThreadPool({
    size:os.cpus().length
})
module.exports = [
    new HappyWebpack({
        id:'happyTS',
        threadPool:happyThreadPoll,
        //输入日志
        verbose:true,
        loaders:[{
            path:"ts-loader",
            query:{
                happyPackMode:true
            }
        }]
    }),
    new HappyWebpack({
        id:'happyCSS',
        threadPool:happyThreadPoll,
        loaders:[
            { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
    })
]