const koa = require("koa");
// const path = require("path");
const view = require("./views");
const bodyParser = require("koa-bodyparser");
const app = new koa();
const api = require("./api");
const router = require("./routes");
const pool = require("./db");
const schedule = require("node-schedule");
// const static = require("koa-static");
// const mount = require("koa-mount");
const CSRF = require("koa-csrf");
const session = require("koa-session");
app.keys = ["happyread", "hahahah", "gg"];

// const CONFIG = {
//     key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
//     /** (number || 'session') maxAge in ms (default is 1 days) */
//     /** 'session' will result in a cookie that expires when session/browser is closed */
//     /** Warning: If a session cookie is stolen, this cookie will never expire */
//     maxAge: 86400000,
//     autoCommit: true /** (boolean) automatically commit headers (default true) */,
//     overwrite: true /** (boolean) can overwrite or not (default true) */,
//     httpOnly: false /** (boolean) httpOnly or not (default true) */,
//     signed: false /** (boolean) signed or not (default true) */,
//     rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
//     renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
// };

app.use(session({}, app));

global.pool = pool.promise();

// let sqlSchedule = schedule.scheduleJob("0 0 0 * * *", date => {
//     console.log(date.toLocaleString());
// });
// app.use(new CSRF());
app.use(bodyParser());
app.use(async (ctx, next) => {
    const startTime = new Date().getTime();
    await next();
    console.log(
        new Date().getTime() - startTime,
        "-----处理时间------",
        ctx.ip
    );
});
app.use(async function(ctx, next) {
    try {
        await next();
    } catch (err) {
        const available_code_map = new Map(
            new Set([400, 401, 403, 404, 500]).entries()
        );
        const errCode =
            available_code_map.get(err ? err.statusCode : 500) || 500;
        ctx.status = errCode;
        ctx.type = "json";
        ctx.body = { cd: 1, msg: "网络出错，请稍后重试", data: null };
        ctx.app.emit("error", err, ctx);
    }
});
app.use(async (ctx, next) => {
    api(ctx);
    await next();
});
app.use(router);
view(app);
app.listen(7887, () => {
    console.log("koa ok!");
});

app.on("error", function(err) {
    console.log(err);
    console.log("sent error %s to the cloud", err.message);
});
