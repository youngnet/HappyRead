const cheerio = require("cheerio");

function handleHome(html) {
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
}

function handleBookDetail(html) {
    const $ = cheerio.load(html);
    const bookInfo = {};
    const newChapterList = [];
    const chapterList = [];
    bookInfo.name = $(".book_info .book_box .name").text();
    // 获取最新章节和当前浏览章节
    $(".book_last").each((index, ele) => {
        if (index === 0) {
            // 最新章节
            $(ele)
                .find("dd a")
                .each((i, chapter) => {
                    const chapterInfo = {};
                    chapterInfo.link = $(chapter).attr("href");
                    chapterInfo.name = $(chapter).text();
                    newChapterList.push(chapterInfo);
                });
        } else {
            // 当前浏览章节
            $(ele)
                .find("dd a")
                .each((i, chapter) => {
                    const chapterInfo = {};
                    chapterInfo.link = $(chapter).attr("href");
                    chapterInfo.name = $(chapter).text();
                    chapterList.push(chapterInfo);
                });
        }
    });
    return { bookInfo, chapterList, newChapterList };
}

module.exports = { handleHome, handleBookDetail };
