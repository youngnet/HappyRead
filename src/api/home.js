import api from "./index";

export function getHomeList(link = "/") {
    return api.post("/source/getHome", { link });
}
export function getNavList() {
    return api.post("/source/getNavList");
}

export function getTypeDetail(link) {
    return api.post("/source/getTypeDetail", { link });
}
export function getTypeBookList(link) {
    return api.post('/source/getTypeBookList', {link})
}