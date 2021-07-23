import { ApiParams } from "@/plugins/http";
const apiList: Array<ApiParams> = [
  {
    name: "ApiName",
    method: "GET",
    desc: "Api Description",
    path: "/path",
    prepath: "/api/v1",
    baseURL: "",
    params: {
      field: "value",
    },
    options: {
      isSignature: false,
      hasRetry: true,
    },
  },
];

export default apiList;
