const Router = require('koa-router');
const router = new Router();
const iconv = require('iconv-lite');
const operationSource = require('../operate');

router.post('/getHome', async (ctx) => {
	let res = await ctx.get('https://m.biqukan.com', {
		transformResponse: [
			function(data) {
				return iconv.decode(data, 'gbk');
			}
		],
		responseEncoding: 'gbk',
		responseType: 'arraybuffer'
	});
	let data = operationSource(res);
	// data.navList.forEach(async (navInfo) => {
	// 	let [ result ] = await global.pool.query(`SELECT name FROM nav WHERE name=?`, navInfo.name);
	// 	if (result.length) {
	// 		// 存在该导航
	// 		// await global.pool.execute('UPDATE nav SET `link`=?  WHERE `name`=?', [ navInfo.link, navInfo.name ]);
	// 	} else {
	// 		await global.pool.query('INSERT INTO nav SET ?', navInfo);
	// 	}
	// });
	// let [ dbData ] = await global.pool.query('SELECT * FROM hot');
	// data.dbData = dbData;
	ctx.body = data;
});

router.post('/getTags', async (ctx) => {
	let res = await ctx.get('https://h5.17k.com/ck/book/category/2');
	ctx.body = res;
});

module.exports = router;
