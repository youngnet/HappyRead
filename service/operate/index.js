const cheerio = require("cheerio");

module.exports = function(html) {
    const $ = cheerio.load(html);
    const navList = [];
    const hotList = [];
    const recommendList = [];
    $("div.nav li a").each((index, ele) => {
        const dataItem = {};
        dataItem.link = $(ele).attr("href");
        dataItem.name = $(ele).text();
        navList.push(dataItem);
    });
    $("div.hot .item").each((index, ele) => {
        const $ele = $(ele);
        const bookInfo = {};
        bookInfo.link = $ele.find("a").attr("href");
        bookInfo.picUrl = $ele.find("a img").attr("src");
        bookInfo.author = $ele.find("dl dt span").text();
        bookInfo.title = $ele.find("dl dt a").text();
        bookInfo.desc = $ele.find("dl dd").text();
        hotList.push(bookInfo);
    });
    $("div.block").each((index, ele) => {
        const $typeEle = $(ele);
        const recommend = {};
        recommend.list = [];
        recommend.name = $typeEle.find("h2").text();
        $typeEle.find("ul.lis li").each((index, ele) => {
            const $ele = $(ele);
            const bookInfo = {};
            bookInfo.type = $ele.find(".s1").text();
            bookInfo.link = $ele.find(".s2 a").attr("href");
            bookInfo.title = $ele.find(".s2 a").text();
            bookInfo.author = $ele.find(".s3").text();
            recommend.list.push(bookInfo);
        });
        recommendList.push(recommend);
    });
    return { navList, hotList, recommendList };
};
