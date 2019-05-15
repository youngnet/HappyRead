const Router = require("koa-router");
const router = new Router();
const iconv = require("iconv-lite");
const operationSource = require("../operate");

router.post("/source/getHome", async ctx => {
    let res = await ctx.get("https://m.biqukan.com", {
        transformResponse: [
            function(data) {
                return iconv.decode(data, "gbk");
                // return data;
            }
        ],
        responseEncoding: "gbk",
        responseType: "arraybuffer"
    });
    let data = operationSource(res);

    ctx.body = data;
});

module.exports = router;
