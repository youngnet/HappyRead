import axios from "axios";
import config from "../../config.json";

axios.defaults.baseURL = config.apiConfig[process.env.NODE_ENV].baseURL;
axios.interceptors.response.use(res => {
    return res.data;
});
export default axios;
