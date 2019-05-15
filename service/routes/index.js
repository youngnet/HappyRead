const Router = require("koa-router");
const router = new Router();
const source = require("./source");

router.use(source.routes());

module.exports = router;
