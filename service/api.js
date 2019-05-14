const axios = require("axios");
axios.interceptors.response.use(res => {
    return res.data;
});

module.exports = function(ctx) {
    ctx.post = axios.post;
    ctx.get = axios.get;
};
