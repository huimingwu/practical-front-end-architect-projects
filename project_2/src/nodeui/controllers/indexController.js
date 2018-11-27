import {
    route,
    GET
} from "awilix-koa";

export default
@route("/")
@route('/index.html')
class indexController {
    constructor({indexService}) {
        this.indexService = indexService;
    }
    @GET()
    async indexAction(ctx,next) {
        const result = await this.indexService.getData();
        ctx.body = await ctx.render('index/pages/index', {
            data: result
        });

    }
}