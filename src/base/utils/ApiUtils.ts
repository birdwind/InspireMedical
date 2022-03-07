import axios from "axios";
import { customerErrorHandler } from "@/base/config";
import { ApiBadRequestError, ApiError, ApiUnauthorizedError } from "@/base/error/ApiErrorHandler";
import { MyLogger } from "@/base/utils/MyLogger";
import stores from "@/store";
import { BusinessError } from "@/base/error/BusinessError";

const JwtHeaderName = "authorization";
const ClientActionTimeHeaderName = "x-client-action-time";

export interface MyAxiosPromise<T> extends Promise<T> {}

let underRequesting = false;

const instance = axios.create({
  baseURL: undefined,
  timeout: 1000 * 300,
  maxContentLength: 1024 * 50,
  // accept all status codes
  validateStatus: (status) => {
    return status >= 200 && status < 300;
  },
});

// ** request interceptors  NOTE: interceptors executed in the reverse registry order
instance.interceptors.request.use((config) => {
  // if (config.url!.indexOf("api2") > 0) {
  //   config.headers[JwtHeaderName] = "20101";
  // } else {
  // if (!!SecretKeeper.jwt) {
  //   config.headers[JwtHeaderName] = "Bearer " + SecretKeeper.jwt;
  // }
  // }

  config.headers!["token"] = "0000";

  // config.headers![ClientActionTimeHeaderName] = new Date().getTime().toString();
  return config;
});

// request log
instance.interceptors.request.use((config) => {
  MyLogger.log(instance.defaults);
  return config;
});

// ** end request interceptors

// ** response interceptors

instance.interceptors.response.use((res) => {
  // we could refresh token here
  // lightId 如果非需登入者，則不會回傳 lightId -> 不應該更新

  underRequesting = false;

  return res;
});

// response log
instance.interceptors.response.use((res) => {
  const config = res.config;
  const actionTime = Number(config.headers![ClientActionTimeHeaderName] || 0);

  const timeElapsed = new Date().getTime() - actionTime;

  MyLogger.info(`axios- time elapsed: ${timeElapsed} ms for ${config.url}`, {
    url: config.url,
    reqHeaders: config.headers,
    requestBody: config.data,
    status: res.status,
    resHeaders: res.headers,
    resBody: res.data,
    resOriginal: res,
  });

  return res;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.isSuccess) {
      return response.data.JsonData;
    } else {
      customerErrorHandler(new BusinessError(response.data.Message));
    }
    return Promise.reject(response.data.Message);
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          customerErrorHandler(new ApiError("500", "伺服器錯誤"));
          break;
        case 401:
          stores.dispatch("Auth/logout", {});
          customerErrorHandler(new ApiUnauthorizedError(error.response.status.toString(), error.response.statusText));
          break;
        default:
          customerErrorHandler(new ApiBadRequestError(error.response.status.toString(), error.response.statusText));
          break;
      }
    }
    return Promise.reject(error);
  }
);
// ** end response interceptors

instance.defaults.headers.post["Content-Type"] = "application/json";

export const apiUtils = instance;
