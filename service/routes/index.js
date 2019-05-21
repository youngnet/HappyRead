const Router = require('koa-router');
const router = new Router();
const source = require('./source');

router.use('/source', source);

// 路由url参数
// router.get("/a/:user/:name", async (ctx, next) => {
//     console.log(ctx.params)
//     ctx.body = "hhhh";
// })
// 路由？参数
router.get("/b", async (ctx, next) => {
    console.log(ctx.query)
    ctx.body = "hhhh";
})

module.exports = router.routes();
