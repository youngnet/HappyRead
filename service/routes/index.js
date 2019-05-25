const Router = require('koa-router');
const router = new Router();
const source = require('./source');
const auth = require('./auth')

router.use('/source', source);
router.use('/auth', auth);

// 路由url参数
// router.get("/a/:user/:name", async (ctx, next) => {
//     console.log(ctx.params)
//     ctx.body = "hhhh";
// })
// 路由？参数
// router.get("/b", async (ctx, next) => {
//     console.log(ctx.query)
//     ctx.body = "hhhh";
// })

module.exports = router.routes();
