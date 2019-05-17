const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new koa();
const api = require('./api');
const router = require('./routes');
const pool = require('./db');
const schedule = require('node-schedule');

global.pool = pool.promise();

let sqlSchedule = schedule.scheduleJob('0 0 0 * * *', (date) => {
	console.log(date.toLocaleString());
});

app.use(bodyParser());
app.use(async (ctx, next) => {
	api(ctx);
	await next();
});
app.use(router.routes());

app.listen(7887, () => {
	console.log('koa ok!');
});
