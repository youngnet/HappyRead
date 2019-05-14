import axios from "axios";
import config from "../api.config.json";

axios.defaults.baseURL = config[process.env.NODE_ENV].baseURL;
export default axios;
