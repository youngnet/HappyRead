import api from "./index";

export function getBookDetail(link) {
    return api.post("/source/getBookDetail", { link });
}
