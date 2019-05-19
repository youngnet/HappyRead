const Router = require("koa-router");
const router = new Router();
const iconv = require("iconv-lite");
const { handleHome, handleBookDetail, handleTypePage } = require("../operate/dingdian");


router.post("/getNavList", async ctx => {
    let [data] = await global.pool.query("SELECT * FROM nav");
    ctx.body = { cd: 0, msg: null, data };
});

router.post("/getHome", async ctx => {
    let { link } = ctx.request.body;
    let res = await ctx.get(`https://m.23us.so${link}`, {
        transformResponse: [
            function(data) {
                // return iconv.decode(data, "gbk");
                return data;
            }
        ],
        // responseEncoding: "gbk",
        responseType: "arraybuffer"
    });

    let data = handleHome(res);

    ctx.body = { cd: 0, msg: null, data };
});

router.post("/getTypeDetail", async ctx => {
    let { link } = ctx.request.body;
    let res = await ctx.get(`https://m.23us.so${link}`, {
        transformResponse: [
            function(data) {
                // return iconv.decode(data, "gbk");
                return data;
            }
        ],
        // responseEncoding: "gbk",
        responseType: "arraybuffer"
    });

    let data = handleTypePage(res);

    ctx.body = { cd: 0, msg: null, data };
});

router.post("/getBookDetail", async ctx => {
    let { link } = ctx.request.body;
    let res = await ctx.get(`https://m.23us.so${link}`, {
        transformResponse: [
            function(data) {
                return data;
            }
        ],
        responseType: "arraybuffer"
    });
    // console.log(res.toString())
    let data = handleBookDetail(res);
	console.log("TCL: data", data)
    ctx.body = data;
});

module.exports = router;
