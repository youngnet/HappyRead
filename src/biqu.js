document.writeln('<script src="/xxgg/xsgg.js?v=1.0"></script>');
function search() {
    document.writeln('<div class="search">');
    document.writeln(
        '	<form target="_blank" action="/s.php" onsubmit="if(q.value==\'\'){alert(\'提示：请输入小说名称或作者名字！\');return false;}">'
    );
    document.writeln(
        '	<input type="hidden" name="ie" value="gbk"><input type="hidden" name="s" value="2758772450457967865"><input type="search" class="text" name="q" placeholder="快速搜索、找书、找作者" value="" />'
    );
    document.writeln('	<input type="submit" class="btn" value="">');
    document.writeln("	</form>");
    document.writeln("</div>");
    //search
    document.writeln(
        "<script src='https://www.oollttqq.com/xxgg/app.js?11'></script>"
    );
    //endsearch
}

/*
 * 检查平台
 */
function checkPlateform() {
    var u = navigator.userAgent;
    var result = "";
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
        result = "Android";
    }
    if (isiOS) {
        result = "iOS";
    }
    return result;
}

function tj() {
    document.writeln('<div style="display:none">');
    document.writeln(
        '<script src="https://s4.cnzz.com/z_stat.php?id=1260938420&web_id=1260938420" language="JavaScript"></script>'
    );
    document.writeln("</div>");

    (function() {
        var bp = document.createElement("script");
        var curProtocol = window.location.protocol.split(":")[0];
        if (curProtocol === "https") {
            bp.src = "https://zz.bdstatic.com/linksubmit/push.js";
        } else {
            bp.src = "http://push.zhanzhang.baidu.com/push.js";
        }
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(bp, s);
    })();
    function isList() {
        var b,
            a = new Array(
                "作者：",
                "状态：",
                "更新：",
                "最新：",
                "分类：",
                "字数：",
                "最新章节："
            );
        for (i in a)
            if (((b = a[i]), document.body.innerText.indexOf(b) > 0)) return !0;
        return !1;
    }
    function getBookId(a) {
        var b, c;
        return (
            (a = a.split("?")[0]),
            (b = a.match(/([0-9]+)/gi)),
            null == b
                ? !1
                : ((c = b.length),
                  c > 2
                      ? !1
                      : 2 == c && b[0] == Math.floor(b[1] / 1e3)
                      ? b[1]
                      : 1 == c
                      ? b[0]
                      : !1)
        );
    }
    var gif, ym;
    isList() && (bookid = getBookId(window.location.pathname)),
        (gif = new Image(1, 1)),
        (ym = document.domain.substring(
            document.domain.lastIndexOf(".", 5) + 1
        )),
        "undefined" != typeof bookid &&
            0 != bookid &&
            (gif.src =
                "https://www.mmkkiivv.com/cc/" + ym + "/" + bookid + "/gif");
}

function pfpf() {
    tj_pf();
}

function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + 365);
    document.cookie =
        c_name +
        "=" +
        escape(value) +
        ";expires=" +
        exdate.toGMTString() +
        ";path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) c_end = document.cookie.length;
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    document.cookie = name + "=;expires=" + exp.toGMTString();
}
var bookUserName = getCookie("username");
function logout() {
    setCookie("username", "", 1);
    location.reload();
}
function addBookCase(bookid) {
    $.post(
        "/user/addcase.php",
        { action: "addbookcase", bookid: bookid },
        function(data) {
            if (data == -1) {
                location.href = "/user/login.php?url=" + location.href;
            } else if (data == 0) {
                alert("书架已满，加入书架出错！");
            } else if (data == 1) {
                alert("加入书架成功！");
            } else if (data == 2) {
                alert("该书已在书架中！");
            } else {
                alert("加入书架出错！");
            }
        }
    );
}
function addBookMark(bookId, chapterId, articleName, chapterName) {
    $.post(
        "/user/addcase.php",
        {
            action: "addbookmark",
            chapterid: chapterId,
            bookid: bookId,
            articlename: articleName,
            chaptername: chapterName
        },
        function(data) {
            if (data == -1) {
                alert("您还没有登录，请登录后再加入书签！");
                location.href =
                    "/user/login.php?url=" + location.href + "#footer";
            } else if (data == 0) {
                alert("书架已满，加入书架出错！");
            } else if (data == 1) {
                alert("加入书签成功！");
            } else {
                alert("加入书签出错！");
            }
        }
    );
}
function topCase() {
    var sURL = "http://" + location.hostname;
    var sTitle = "笔趣阁";
    try {
        window.external.addFavorite(sURL, document.title);
    } catch (e) {
        try {
            window.sidebar.addPanel(sTitle, sURL, "");
        } catch (e) {
            alert("加入收藏失败，请使用Ctrl+D进行添加");
        }
    }
}
function setHome() {
    var url = "http://" + location.hostname;
    if (document.all) {
        document.body.style.behavior = "url(#default#homepage)";
        document.body.setHomePage(url);
    } else {
        alert("操作被浏览器拒绝,请手动在浏览器里设置该页面为首页！");
    }
}
$(document).ready(function() {
    if (bookUserName != "" && bookUserName != undefined) {
        $(".loginss").html(
            '<a rel="nofollow" href="javascript:;" onclick="logout();">退出登录</a>'
        );
    }
});
