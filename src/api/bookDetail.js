import api from "./index";

// 获取书籍信息
export function getBookDetail(link) {
    return api.post("/source/getBookDetail", { link });
}

// 获取章节列表
export function getChapterList(link) {
    return api.post("/source/getChapterList", { link });
}

// 获取章节详情
export function getReadContent(link) {
    return api.post('/source/getReadContent', {link})
}