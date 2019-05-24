import axios from "axios";
import config from "../../config.json";
import history from "../routes/history";

axios.defaults.baseURL = config.apiConfig[process.env.NODE_ENV].baseURL;
axios.interceptors.response.use(res => {
    if (res.data.cd === -1) {
        history.push("/login");
    }
    return res.data;
});
export default axios;
