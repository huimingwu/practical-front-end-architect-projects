"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        //log
        //如果给出服务器接口，可以单独把log4js接入到集群服务器中
        //可以留电话 邮件 姓名
        logger.error(error); //用200，不用500，百度降权问题

        ctx.status = error.status || 200;
        ctx.body = "请求出错";
      }
    });
    app.use(async (ctx, next) => {
      await next();
      if (404 != ctx.status) return;
      ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="回到我的主页"></script>';
    });
  }

};
exports.default = errorHandler;