import axios, {
  AxiosPromise,
  Method,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";
import assert from "assert";
import _assign from "lodash/assign";
import { HTTP_DEFAULT_CONFIG, AXIOS_DEFAULT_CONFIG, HttpDefaultConfig } from "@/config";
import apis from "@/api";
import {
  requestSuccessFunc,
  requestFailFunc,
  responseSuccessFunc,
  responseFailFunc,
} from "@/config/interceptors/axios";
import { _firstUpperCase } from "@/utils/tools";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiRequestParams = Record<string, any>;

type ApiRequestOptions = {
  isSignature?: boolean;
  pathParams?: Record<string, unknown>;
  upload?: unknown;
  type?: string;
  hasRetry?: boolean;
  retryCount?: number;
};

export interface RequestConfig extends AxiosRequestConfig {
  options?: ApiRequestOptions;
}
export type ResponseConfig = AxiosResponse;
export interface HttpError extends AxiosError {
  config: RequestConfig;
}
export type HttpAxiosInstance = AxiosInstance;

export type ApiParams = {
  name: string;
  method: Method;
  desc: string;
  path: string;
  baseURL?: string;
  prepath?: string;
  params: ApiRequestParams;
  options: ApiRequestOptions;
};

type ApiRequestFunction = (params?: ApiRequestParams, options?: ApiRequestOptions) => AxiosPromise<unknown>;

export type ApiObject = Record<string, ApiRequestFunction>;

export type HttpInstance = {
  RESTapi: ApiObject;
};

export const METHODS = {
  GET: "GET",
  DELETE: "DELETE",
  HEAD: "HEAD",
  OPTIONS: "OPTIONS",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  PURGE: "PURGE",
  LINK: "LINK",
  UNLINK: "UNLINK",
};

function builder({
  apiModules,
  RESTApiConfig,
}: {
  apiModules: Record<string, Array<ApiParams>>;
  RESTApiConfig: HttpDefaultConfig;
}): HttpInstance {
  const requesInstance = {
    RESTapi: {},
  };
  Object.keys(apiModules).forEach((nameSpace: string) =>
    apiModules[nameSpace].forEach((api: ApiParams) =>
      RESTApiBuilder({
        nameSpace,
        api,
        config: RESTApiConfig,
        RESTApiInstance: requesInstance.RESTapi,
      })
    )
  );
  return requesInstance;
}

function RESTApiBuilder({
  nameSpace,
  api,
  config,
  RESTApiInstance,
}: {
  nameSpace: string;
  api: ApiParams;
  config: HttpDefaultConfig;
  RESTApiInstance: ApiObject;
}): void {
  config.debug && assert(api.path.indexOf("/") === 0, `${api.path} :Invalid format of path field`);
  const url = api.path;
  config.debug && assert(api.name, `${url} :The name attribute cannot be empty`);
  const apiName = `${nameSpace}${_firstUpperCase(api.name)}`;
  const _subPrepath = api.prepath ? api.prepath : config.prepath;
  const prepath = config.isProd ? _subPrepath : `/test${_subPrepath}`;
  const baseURL = api.baseURL ? api.baseURL : "";
  Object.defineProperty(RESTApiInstance, apiName, {
    value: (params?: ApiRequestParams, options?: ApiRequestOptions): AxiosPromise<unknown> => {
      const URL = (prepath + url).replace(/\{:[a-zA-Z]{1,}\}/g, (match: string) => {
        const fieldsName = match.slice(2, match.length - 1);
        const pathValue = options?.pathParams;
        return pathValue && pathValue[fieldsName] ? pathValue[fieldsName] + "" : match;
      });
      const defaultOptions = {
        isSignature: false,
        pathParams: {},
        hasRetry: false,
        retryCount: 3,
      }
      let obj: RequestConfig = {
        url: URL,
        method: api.method,
        baseURL,
        options: _assign(defaultOptions, _assign(api.options, options)),
      };
      const requesParams = _assign(api.params, params ? params : {});
      if (api.method == METHODS.POST) {
        const formData = new FormData();
        Object.keys(requesParams).forEach((v: string) => {
          formData.append(v, requesParams[v]);
        });
        obj = _normoalize(obj, formData);
      } else {
        obj = _normoalize(obj, requesParams);
      }
      return axiosInstance(obj);
    },
  });
}

function _normoalize(requestConfig: RequestConfig, data: ApiRequestParams | FormData): RequestConfig {
  if (requestConfig.method === METHODS.POST) {
    requestConfig.data = data;
  } else if (requestConfig.method === METHODS.GET || requestConfig.method === METHODS.DELETE) {
    requestConfig.params = data;
  }
  return requestConfig;
}

const http = builder({
  apiModules: apis,
  RESTApiConfig: HTTP_DEFAULT_CONFIG,
});

export const httpRestApi = http.RESTapi;

export const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);

axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc);

axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc);
