import axios, { AxiosResponse } from "axios";
import cookiesStore from "./cookiesStore";
import showError from "../utils/showError";
import { DEFINE_ROUTERS_ADMIN } from "../constants/route-mapper";

const API_URL: string | undefined = import.meta.env.VITE_BASE_URL;

const axiosRequest = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});
const token = cookiesStore.get("access_token");

axiosRequest.defaults.headers.put["Content-Type"] = "application/json";
axiosRequest.defaults.headers.common["Authorization"] = cookiesStore.get(
  "access_token"
)
  ? "Bearer " + token
  : "";

const onFulFillResponse = (
  value: AxiosResponse<any, any>
): AxiosResponse<any, any> | Promise<AxiosResponse<any, any>> => {
  return value;
};

const onRejectResponse = (error: any) => {
  const { data, status } = error.response;

  if (status === 401 || status === 403) {
    cookiesStore.remove("access_token");
    axiosRequest.defaults.headers.common["Authorization"] = "";
    location.href = DEFINE_ROUTERS_ADMIN.loginAdmin;
  }
  if (!error.response || error.response.status >= 500) {
    return Promise.reject(error);
  }

  showError(data);

  return Promise.reject(error);
};

axiosRequest.interceptors.response.use(onFulFillResponse, onRejectResponse);
axiosRequest.interceptors.request.use((config) => {
  const token = cookiesStore.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosRequest;
