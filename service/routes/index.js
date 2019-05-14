const Router = require("koa-router");
const router = new Router();

router.post("/123", async ctx => {
    let res = await ctx.get(
        "http://api01.idataapi.cn:8000/news/qihoo?apikey=Auwam25poMIMbTzsENIzXUbf75oM4bxBbcm5gaTw67OhgD5OUB40R6AE65Vx0Rrd&kw=nba"
    );
    ctx.body = res;
});

module.exports = router;
