const axios = require("axios");
const pool = require("./db");
global.pool = pool.promise();
axios.interceptors.response.use(res => {
    return res.data;
});
const {handleBookDetail,handleHome} = require('./operate/dingdian');
const interValGetData = async () => {
	let res = await axios.get('https://m.23us.so/', {
		transformResponse: [
			function(data) {
				return data;
			}
		],
		responseType: 'arraybuffer'
	});

	let data = handleHome(res);
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
	// hotList.forEach(async (hotInfo) => {
	// 	let [ result ] = await global.pool.query(`SELECT name FROM hot WHERE title=?`, hotInfo.title);
	// 	if (result.length) {
	// 		// 存在该热门
	// 		// await global.pool.execute('UPDATE nav SET `link`=?  WHERE `name`=?', [ navInfo.link, navInfo.name ]);
	// 	} else {
	// 		await global.pool.query('INSERT INTO nav SET ?', hotInfo);
	// 	}
	// });
};

module.exports = interValGetData;