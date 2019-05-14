const Router = require("koa-router");
const router = new Router();

router.post("/source/getHome", async ctx => {
    let res = await ctx.get("https://m.biqukan.com");
    ctx.response
    ctx.body = res;
});

module.exports = router;