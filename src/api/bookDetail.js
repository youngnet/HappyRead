import api from "./index";

export function getBookDetail(link) {
    return api.post("/source/getBookDetail", { link });
}

export function getReadContent(link) {
    return api.post('/source/getReadContent', {link})
}