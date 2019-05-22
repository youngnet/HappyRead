const cheerio = require("cheerio");

// 首页
function handleHome(html) {
    const $ = cheerio.load(html);
    const navList = [];
    const hotList = handleHot($);
    const recommendList = [];
    $(".nav li a").each((index, ele) => {
        const navInfo = {};
        const $ele = $(ele);
        navInfo.link = $ele.attr("href");
        navInfo.name = $ele.text();
        navList.push(navInfo);
    });

    // hotList = handleHot($);

    $(".article").each((index, ele) => {
        const recommendType = {};
        recommendType.title = $(ele)
            .find(".title span")
            .text();
        recommendType.list = [];
        $(ele)
            .find(".block ul li")
            .each((i, book) => {
                const $book = $(book);
                const bookInfo = {};
                bookInfo.type = $book.text().split("]")[0] + "]";
                bookInfo.link = $book.find("a").attr("href");
                bookInfo.name = $book.find("a").text();
                bookInfo.author = $book.find(".s3").text();
                recommendType.list.push(bookInfo);
            });
        recommendList.push(recommendType);
    });

    return { navList, hotList, recommendList };
}

// 书详情页
function handleBookDetail(html) {
    const $ = cheerio.load(html);
    const bookInfo = {};
    const newChapterList = [];
    const chapterList = [];
    $book = $(".block");
    bookInfo.link = $book.find("h2 a").attr("href");
    bookInfo.picUrl = $book.find(".block_img2 img").attr("src");
    bookInfo.name = $book.find("h2 a").text();
    bookInfo.infoList = [];
    bookInfo.updateTime = $(".intro.str-over-dot")
        .text()
        .split("：")[1];
    $book.find("p").each((i, ele) => {
        let text = $(ele).text();
        text && bookInfo.infoList.push(text);
    });

    bookInfo.totalPage = $("span.middle option").length;
    $(".chapter")
        .eq(0)
        .each((index, ele) => {
            // 最新章节
            $(ele)
                .find("a")
                .each((i, chapter) => {
                    const chapterInfo = {};
                    chapterInfo.link = $(chapter).attr("href");
                    chapterInfo.name = $(chapter).text();
                    newChapterList.push(chapterInfo);
                });
        });
    $(".chapter")
        .eq(1)
        .each((index, ele) => {
            // 当前浏览章节
            $(ele)
                .find("a")
                .each((i, chapter) => {
                    const chapterInfo = {};
                    chapterInfo.link = $(chapter).attr("href");
                    chapterInfo.name = $(chapter).text();
                    chapterList.push(chapterInfo);
                });
        });
    const reg = /.+\/(\d+)\.html/;
    // bookInfo.totalPage = reg.exec(
    //     $("select option")
    //         .last()
    //         .val()
    // )[1];

    // bookInfo.totalPage = lastPageLink[lastPageLink.length - 1].split(".")[0];
    return { bookInfo, chapterList, newChapterList };
}

function handleChapterList(html) {
    const $ = cheerio.load(html);
    const chapterList = [];

    $(".chapter")
        .eq(1)
        .each((index, ele) => {
            // 当前浏览章节
            $(ele)
                .find("a")
                .each((i, chapter) => {
                    const chapterInfo = {};
                    chapterInfo.link = $(chapter).attr("href");
                    chapterInfo.name = $(chapter).text();
                    chapterList.push(chapterInfo);
                });
        });

    return chapterList;
}

// 分类详情页面
function handleTypePage(html) {
    const $ = cheerio.load(html);
    const hotList = handleHot($);
    const reg = /[\/_](\d+)\.html$/;
    const totalPage = reg.exec(
        $(".pages .a-btn")
            .last()
            .attr("href")
    )[1];

    return { hotList, totalPage };
}
// 分类分页书籍获取
function handleBookList(html) {
    const $ = cheerio.load(html);
    const allBookList = [];
    $(".wrap .block .lis li").each((i, ele) => {
        const bookInfo = {};
        const $ele = $(ele);
        bookInfo.type = $ele.find(".s1").text();
        bookInfo.author = $ele.find(".s3").text();
        bookInfo.name = $ele.find(".s2 a").text();
        bookInfo.link = $ele.find(".s2 a").attr("href");
        allBookList.push(bookInfo);
    });
    return allBookList;
}

function handleHot($) {
    const hotList = [];
    $(".hot .item").each((index, ele) => {
        const $ele = $(ele);
        const hotInfo = {};
        hotInfo.picUrl = $ele.find(".image img").attr("src");
        hotInfo.link = $ele.find(".image a").attr("href");
        hotInfo.author = $ele.find("dl dt span").text();
        hotInfo.name = $ele.find("dl dt a").text();
        hotInfo.description = $ele.find("dl dd").text();
        hotList.push(hotInfo);
    });
    return hotList;
}

// 阅读页解析
function handleReadPage(html) {
    const $ = cheerio.load(html);
    const chapterDetail = {};
    chapterDetail.name = $("#_52mb_h1").text();
    chapterDetail.content = $("#nr1").html();
    chapterDetail.prevChapter = $("#pb_prev").attr("href");
    chapterDetail.nextChapter = $("#pb_next").attr("href");
    chapterDetail.directory = $("#pb_mulu").attr("href");
    return chapterDetail;
}

module.exports = {
    handleHome,
    handleBookDetail,
    handleTypePage,
    handleReadPage,
    handleBookList,
    handleChapterList
};
