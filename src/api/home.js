import api from './index'

export function getNews() {
    return api.post('/source/getTags');
}
export function getHomeList() {
    return api.post('/source/getHome');
}