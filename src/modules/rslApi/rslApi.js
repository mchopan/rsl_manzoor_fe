import axios from "axios";
import { serverConfig } from "../../serverConfig/serverConfig";

let appServerUrl = serverConfig.appServerUrl;

const NewsApi = config => {
    config.baseUrl = appServerUrl;
    return axios(config);
};

export default NewsApi;