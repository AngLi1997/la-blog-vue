import axios from "axios";

const laAxios = axios.create()
// laAxios.interceptors.request.use(config => config, err => Promise.reject(err));
// laAxios.interceptors.response.use(resp => resp, err => Promise.reject(err));
export default laAxios;
