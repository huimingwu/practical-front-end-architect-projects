import indexController from "./indexController"
const insIndexController = new indexController()
//路由集散中心
export default(app,router)=>{
    app.use(router(_ => {
        _.get('/', insIndexController.indexAction())
    }))
}