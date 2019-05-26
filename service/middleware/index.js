async function login_required(ctx, next) {
    let token = ctx.cookies.get("token");
    if (!token) {
        ctx.body = { cd: -1, msg: "请先登录" };
    } else {
        const tokens = ctx.session.token || {};
        let [id] = Object.entries(tokens).find(([id, t]) => t == token) || [];
        if (id) {
            await next();
        } else {
            ctx.body = { cd: -1, msg: "token失效" };
        }
    }
}

module.exports = { login_required };
