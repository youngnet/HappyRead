const proxy = require("http-proxy-middleware");
// 设置proxy development环境生效
module.exports = function(app) {
    app.use(
        proxy("/api", {
            target: "http://localhost:7887",
            pathRewrite: { "^/api": "" }
        })
    );
};
