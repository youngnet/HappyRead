const Router = require('koa-router');
const router = new Router();
const source = require('./source');

router.use('/source', source.routes());

module.exports = router;
