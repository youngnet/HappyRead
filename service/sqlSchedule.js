const api = require('./api');
const operationSource = require('./operate');
const interValGetData = async () => {
	let res = await api.get('https://m.biqukan.com', {
		transformResponse: [
			function(data) {
				return iconv.decode(data, 'gbk');
			}
		],
		responseEncoding: 'gbk',
		responseType: 'arraybuffer'
	});
	let data = operationSource(res);
	let { navList, hotList, recommendList } = data;
	navList.forEach(async (navInfo) => {
		let [ result ] = await global.pool.query(`SELECT name FROM nav WHERE name=?`, navInfo.name);
		if (result.length) {
			// 存在该导航
			// await global.pool.execute('UPDATE nav SET `link`=?  WHERE `name`=?', [ navInfo.link, navInfo.name ]);
		} else {
			await global.pool.query('INSERT INTO nav SET ?', navInfo);
		}
	});
	hotList.forEach(async (hotInfo) => {
		let [ result ] = await global.pool.query(`SELECT name FROM hot WHERE title=?`, hotInfo.title);
		if (result.length) {
			// 存在该导航
			// await global.pool.execute('UPDATE nav SET `link`=?  WHERE `name`=?', [ navInfo.link, navInfo.name ]);
		} else {
			await global.pool.query('INSERT INTO nav SET ?', hotInfo);
		}
	});
};
