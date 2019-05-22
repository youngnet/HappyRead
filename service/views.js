const static = require("koa-static");
const mount = require("koa-mount");
const path = require("path");
const fs = require("fs");
const router = new (require("koa-router"))();
router.get("/:path*", async (ctx, next) => {
    ctx.type = "text/html";
    ctx.body = await sendFile();
});
module.exports = function(app) {
    app.use(static(path.join(__dirname, "../build")));
    // app.use(mount("/home", static(path.join(__dirname, "../build"))));
    app.use(router.routes());
};

sendFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path.join(__dirname, "../build/index.html"),
            (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            }
        );
    });
};
