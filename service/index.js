const koa = require("koa");
const view = require("./views");
const bodyParser = require("koa-bodyparser");
const app = new koa();
const api = require("./api");
const router = require("./routes");
const pool = require("./db");
const schedule = require("node-schedule");
const CSRF = require("koa-csrf");
const session = require("koa-session");
app.keys = ["happyread", "hahahah", "gg"];

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = "production";
}

app.use(session({ key: "session" }, app));

const promisePool = pool.promise();

// let sqlSchedule = schedule.scheduleJob("0 0 0 * * *", date => {
//     console.log(date.toLocaleString());
// });
// app.use(new CSRF());

app.use(async (ctx, next) => {
    // console.log(ctx.session);
    ctx.pool = promisePool;
    ctx.md5Key = "yeah";
    const startTime = new Date().getTime();
    await next();
    console.log(`time->${new Date().getTime() - startTime}s --- ip->${ctx.ip}`);
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

app.use(bodyParser());
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
