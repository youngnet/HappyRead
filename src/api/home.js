import api from './index'

export function getNews() {
    return api.post('/123');
}
export function getHomeList() {
    return api.post('/source/getHome');
}