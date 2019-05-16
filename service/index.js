const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const app = new koa();
const api = require("./api");
const router = require("./routes");
const pool = require("./db");

global.pool = pool;
global.pool.execute(
    "INSERT INTO hot(title,picUrl,author,desc) VALUES ",
    [
        '神墓',
        'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268/sign=fd02ff17b80e7bec23da04e7172eb9fa/ca1349540923dd54924d4c70d109b3de9c8248e8.jpg',
       '辰东',
        '辰南寻找万年前爱人雨馨、追索神魔灭亡遗秘的行迹为线索，引出浩茫六道、天地棋局，演绎出一部充满热血、壮烈、凄美的传奇'
    ],
    (err, values) => {
        console.log(err, values);
    }
);

app.use(bodyParser());
app.use(async (ctx, next) => {
    api(ctx);
    await next();
});
app.use(router.routes());

app.listen(7887, () => {
    console.log("koa ok!");
});
