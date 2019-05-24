const Router = require("koa-router");
const router = new Router();
const md5 = require("md5");

router.post("/login", async ctx => {
    let { phone, pw } = ctx.request.body;
    const md5Pw = md5(`${ctx.md5Key}${pw}`);
    let [data] = await ctx.pool.query("SELECT * FROM `user`");

    let user = data.find(user => user.phone == phone);
    if (user) {
        // 存在当前用户且密码正确
        console.log("------", user);
        if (user.password === md5Pw) {
            if (!ctx.session.token) {
                ctx.session.token = {};
            }
            const token = md5(`${new Date().getTime()}${user.id}`);
            ctx.session.token[`user_${user.id}`] = token;
            ctx.cookies.set("token", token);
            ctx.body = { cd: 0, msg: "登录成功", data: {} };
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
        const token = md5(`${new Date().getTime()}${result.insertId}`);
        ctx.session.token[`user_${result.insertId}`] = token;
        ctx.cookies.set("token", token);
        ctx.body = { cd: 0, msg: "登录成功", data: {} };
    }
});

router.post("getUserInfo", async ctx => {
    let token = ctx.cookies.get("token");
    if (!token) {
        ctx.body = { cd: -1, msg: "请先登录" };
    } else {
        let [id] = Object.entries(ctx.session.token).find(
            ([id, t]) => t == token
        );
        if (id) {
            let [userInfo] = await ctx.pool.query(
                "SELECT * FROM `user` where id=?",
                id
            );
            ctx.body = { cd: 0, msg: null, data: userInfo };
        } else {
            ctx.body = { cd: -1, msg: "token失效" };
        }
    }
});

module.exports = router.routes();
