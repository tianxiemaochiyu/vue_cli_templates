import { AxiosRequestConfig } from "axios";

export type HttpDefaultConfig = {
  prepath: string;
  isProd: boolean; // false：访问测试接口  true: 访问线上接口
  debug: boolean;
  retryCount: number;
};

export const NODE_ENV = process.env.NODE_ENV || "development";

// http config
export const HTTP_DEFAULT_CONFIG: HttpDefaultConfig = {
  prepath: "/api/v1",
  isProd: NODE_ENV === "production" ? true : false, // false：访问测试接口  true: 访问线上接口
  debug: NODE_ENV === "production" ? false : false,
  retryCount: 3,
};
// axios global config
export const AXIOS_DEFAULT_CONFIG: AxiosRequestConfig = {};

// router config
export const ROUTER_DEFAULT_CONFIG = {
  baseURL: process.env.BASE_URL || "/",
};
