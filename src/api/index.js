import axios from "axios";
import config from "../../config.json";
import history from "../routes/history";
import store from "../store/store";
import * as TYPES from "../store/constants";

axios.defaults.baseURL = config.apiConfig[process.env.NODE_ENV].baseURL;
axios.interceptors.response.use(res => {
    if (res.data.cd === -1) {
        history.push("/login");
        store.dispatch({ type: TYPES.ADD_USER_INFO, user: {} });
    }
    return res.data;
});
export default axios;
