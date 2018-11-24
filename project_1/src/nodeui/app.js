import Koa from 'koa';
import config from "./config";
import router from "koa-simple-router";
import controllerInit from "./controllers";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
import errorHandler from './middlewares/errorHandler';
import log4js from 'log4js';
const app = new Koa();
log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname+'/logs/huimingwu.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));
errorHandler.error(app,logger)
controllerInit(app,router);
app.use(serve(config.staticDir));
app.listen(config.port,()=>{
    console.log(`已开启在on ${config.port}`);
})