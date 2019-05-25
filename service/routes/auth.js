const Router = require("koa-router");
const router = new Router();
const md5 = require("md5");
const uuidv1 = require("uuid/v1");
const { login_required } = require("../middleware");

router.post("/login", async ctx => {
    let { phone, pw } = ctx.request.body;
    const md5Pw = md5(`${ctx.md5Key}${pw}`);
    let [data] = await ctx.pool.query("SELECT * FROM `user`");

    let user = data.find(user => user.phone == phone);
    if (user) {
        // 存在当前用户且密码正确
        if (user.password === md5Pw) {
            if (!ctx.session.token) {
                ctx.session.token = {};
            }
            const token = uuidv1();
            ctx.session.token[`user_${user.id}`] = token;
            ctx.cookies.set("token", token);
            delete user.password;
            ctx.body = { cd: 0, msg: "登录成功", data: user };
        } else {
            ctx.body = { cd: 1, msg: "密码错误", data: {} };
        }
    } else {
        let [result] = await ctx.pool.query("INSERT INTO `user` set ?", {
            phone,
            password: md5Pw
        });

        if (!ctx.session.token) {
            ctx.session.token = {};
        }
        const token = uuidv1();
        ctx.session.token[`user_${result.insertId}`] = token;
        ctx.cookies.set("token", token);
        ctx.body = {
            cd: 0,
            msg: "登录成功",
            data: { id: result.insertId, phone }
        };
    }
});

router.post("/getUserInfo", login_required, async ctx => {
    let token = ctx.cookies.get("token");
    let [id] = Object.entries(ctx.session.token).find(([id, t]) => t == token);
    let [result] = await ctx.pool.query(
        "SELECT `id`,`phone`,`name` FROM `user` where id=?",
        id.split("_")[1]
    );
    const userInfo = result[0];
    ctx.body = { cd: 0, msg: null, data: userInfo };
});

module.exports = router.routes();
