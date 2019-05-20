const Router = require("koa-router");
const router = new Router();
const iconv = require("iconv-lite");
const {
    handleHome,
    handleBookDetail,
    handleTypePage,
    handleReadPage
} = require("../operate/dingdian");

router.post("/getNavList", async ctx => {
    let [data] = await global.pool.query("SELECT * FROM nav");
    ctx.body = { cd: 0, msg: null, data };
});

router.post("/getHome", async ctx => {
    let { link } = ctx.request.body;
    let res = await getPage(ctx, link);

    let data = handleHome(res);

    ctx.body = { cd: 0, msg: null, data };
});

router.post("/getTypeDetail", async ctx => {
    let { link } = ctx.request.body;
    let res = await getPage(ctx, link);

    let data = handleTypePage(res);

    ctx.body = { cd: 0, msg: null, data };
});

router.post("/getBookDetail", async ctx => {
    let { link } = ctx.request.body;
    let res = await getPage(ctx, link);
    // console.log(res.toString())
    let data = handleBookDetail(res);

    ctx.body = data;
});

router.post("/getReadContent", async ctx => {
    let { link } = ctx.request.body;
    let res = await getPage(ctx, link);
    let data = handleReadPage(res);
    ctx.body = data;
});

async function getPage(ctx, link) {
    let res = await ctx.get(`https://m.23us.so${link}`, {
        transformResponse: [
            function(data) {
                return data;
            }
        ],
        responseType: "arraybuffer"
    });
    return res;
}

module.exports = router;
