import axios, { AxiosInterceptorManager, AxiosRequestConfig } from "axios";

type Interceptor = Parameters<AxiosInterceptorManager<any>["use"]>;

type CustomConfig = {
  simpleResponse?: boolean;
  errorMessageShow?: boolean;
  // requestInterceptors?: Array<Interceptor>;
  // responseInterceptors?: Array<Interceptor>;
};

type Config = Omit<AxiosRequestConfig, "url"> & CustomConfig;

const DEFAULT_CONFIG: Config = {
  simpleResponse: true, // 简洁的数据结构响应, true // reduct_data_format? { data: xxx} : { response: { data : xxx } }
  errorMessageShow: true, // 接口错误信息展示,默认为true
};

const BASEURL =
  process.env.NODE_ENV === "development" || typeof window === "undefined"
    ? "https://sbuild.cn/orcish/orcish"
    : window.location.origin + "/orcish/orcish";

const service = axios.create({
  baseURL: BASEURL,
  timeout: 10000,
});

service.interceptors.response.use(
  function (response) {
    return response;
  },
  (error) => {
    httpErrorStatusHandle(error); // 处理错误状态

    return Promise.reject(error);
  }
);

export const request = (url: string, config?: Config) => {
  // 自定义配置
  const configWithDefault = Object.assign({ ...DEFAULT_CONFIG }, config);
  // const errorResponseInterceptor: Interceptor = [
  //   undefined,
  //   (error) => {
  //     console.log(121212);
  //     if (configWithDefault.errorMessageShow) {
  //       httpErrorStatusHandle(error); // 处理错误状态
  //     }

  //     return Promise.reject(error);
  //   },
  // ];

  // const { requestInterceptors = [], responseInterceptors = [] } =
  //   configWithDefault;

  // responseInterceptors.push(errorResponseInterceptor);
  // requestInterceptors.forEach(([onFulfilled, onRejected]) =>
  //   service.interceptors.request.use(onFulfilled, onRejected)
  // );
  // responseInterceptors.forEach(([onFulfilled, onRejected]) =>
  //   service.interceptors.response.use(onFulfilled, onRejected)
  // );
  return service(url, configWithDefault);
};

/**
 * 处理异常
 * @param {*} error
 */
function httpErrorStatusHandle(error: any) {
  let messageText = "";
  if (error && error.response) {
    switch (error.response.status) {
      case 302:
        messageText = "接口重定向了！";
        break;
      case 400:
        messageText = "参数不正确！";
        break;
      case 401:
        messageText = "您未登录，或者登录已经超时，请先登录！";
        break;
      case 403:
        messageText = "您没有权限操作！";
        break;
      case 404:
        messageText = `请求地址出错: ${error.response.config.url}`;
        break;
      case 500:
        messageText = "服务器错误！";
        break;
      case 502:
        messageText = "网关错误！";
        break;
      case 504:
        messageText = "服务暂时无法访问，请稍后再试！";
        break;
      default:
        messageText = "异常问题，请联系管理员！";
        break;
    }
  }
  if (error.message.includes("timeout")) messageText = "网络请求超时！";
  if (error.message.includes("Network"))
    messageText = window.navigator.onLine ? "服务端异常！" : "无法连接到网络";
  if (messageText) {
    console.log({ title: messageText, status: "error", position: "top" });
  }
  return messageText;
}
