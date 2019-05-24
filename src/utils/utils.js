import querystring from "querystring";
// let params = new URLSearchParams(location.search);
export function getQuery(query = "") {
    return querystring.parse(query.slice(1));
}
