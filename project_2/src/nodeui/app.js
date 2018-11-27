import Koa from 'koa';
import config from "./config";
import router from "koa-simple-router";
import render from "koa-swig";
import co from "co";
import serve from "koa-static";
import errorHandler from './middlewares/errorHandler';
import log4js from 'log4js';
import { asClass, asValue, createContainer,Lifetime} from 'awilix';
import { scopePerRequest,loadControllers } from 'awilix-koa';
const app = new Koa();
log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname+'/logs/huimingwu.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
});
const logger = log4js.getLogger('cheese');
//创建IOC容器
const container = createContainer();
//每次请求都是new一次类
app.use(scopePerRequest(container));
//装载service
container.loadModules([__dirname+'/service/*.js'],{
    formatName:"camelCase",
    resolverOptions:{
        lifetime:Lifetime.SCOPED
    }
})
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls:["[[","]]"],
    writeBody: false
}));
errorHandler.error(app,logger)
//自动注册所有的路由
app.use(loadControllers('controllers/*.js', { cwd: __dirname }))

app.use(serve(config.staticDir));
app.listen(config.port,()=>{
    console.log(`已开启在on ${config.port}`);
})