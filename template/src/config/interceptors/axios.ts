import { RequestConfig, ResponseConfig, HttpError, axiosInstance } from "@/plugins/http";
import { HTTP_DEFAULT_CONFIG } from "@/config";

export function requestSuccessFunc(config: RequestConfig): RequestConfig {
  if (config.options?.isSignature) {
    // TODO
  }
  config.headers["Accept"] = "application/json";
  config.headers["Accept-Language"] = "en";

  return config;
}

export function requestFailFunc(requestError: RequestConfig): Promise<RequestConfig> {
  return Promise.reject(requestError.data);
}

export function responseSuccessFunc(responseObj: ResponseConfig): Promise<ResponseConfig> {
  return Promise.resolve(responseObj);
}

export function responseFailFunc(responseError: HttpError): Promise<HttpError | ResponseConfig> {
  if (responseError.response) {
    if (responseError.response.status === 400) {
      return Promise.reject(responseError.response.data);
    }
    if (responseError.response.status === 404) {
      return Promise.reject(responseError.response.data);
    }
    if (responseError.response.status === 503) {
      return Promise.reject(responseError.response.data);
    }
    if (responseError.response.status >= 500) {
      return Promise.reject(responseError.response.data);
    }
    return Promise.reject(responseError.response.data);
  } else {
    if (responseError.code === "ECONNABORTED" && responseError.config.method === "GET") {
      const config = responseError.config;
      const hasRetry = config.options?.hasRetry;
      let retryCount = config.options?.retryCount;
      if (!hasRetry) return Promise.reject(responseError);
      if (retryCount !== 0 && !retryCount) {
        retryCount = HTTP_DEFAULT_CONFIG.retryCount;
      }
      if (retryCount <= 0) {
        console.log("Request timed out, retried many times");
        return Promise.reject(responseError);
      }
      retryCount -= 1;
      if (config.options) {
        config.options.retryCount = retryCount;
      }
      console.log(config);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(axiosInstance(config));
        }, 3000);
      });
    }
    return Promise.reject(responseError);
  }
}
