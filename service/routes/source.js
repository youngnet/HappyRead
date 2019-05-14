const Router = require("koa-router");
const router = new Router();
const iconv = require("iconv-lite");

router.post("/source/getHome", async ctx => {
    let res = await ctx.get("https://m.biqukan.com", {
        responseType: "document",
        transformResponse: [
            function(data) {
                return iconv.decode(Buffer.from(data), "gbk");
            }
        ],
    });
    ctx.body = res;
});

module.exports = router;
