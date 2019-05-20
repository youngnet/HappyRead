import querystring from "querystring";
export function getQuery(query = "") {
    return querystring.parse(query.slice(1));
}
