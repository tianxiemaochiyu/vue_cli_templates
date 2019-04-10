import axios from '@/plugins/axios'
import _assign from 'lodash/assign'

import API_CONFIG from '@/config/api'
import API from '@/api'

class MakeApi {
    constructor(options) {
        this.api = {};
        this.apiBuilder(options);
    }

    apiBuilder({api = {}, environment = ''}) {
        Object.keys(api).map(nameSpace => {
            this.builder({
                nameSpace,
                environment,
                apiObj: api[nameSpace]
            })
        })
    }

    builder({nameSpace, apiObj = {}, environment = ''}) {
        apiObj.forEach(api => {
            const {
                name,
                desc,
                params,
                method,
                path,
                options,
                baseUrl
            } = api;
            let apiName = `${nameSpace}${_firstUpperCase(name)}`,
                baseURL = baseUrl,
                url = baseURL + (environment ? ('/test' + path) : path);

            if (!name) throw new Error(`[Apior] ${path} :接口name属性不能为空`);
            if (!path.indexOf('/') === 0) throw new Error(`[Apior] ${path} :接口路径path，首字符应为/`);

            Object.defineProperty(this.api, apiName, {
                value(outerParams, outerOptions) {
                    let data = {};
                    data = params;
                    if(outerParams){
                        Object.keys(outerParams).forEach(v => {
                            data[v] = outerParams[v]
                        });
                    }
                    // if (method === "POST") {
                    //     let formData = new FormData();
                    //     Object.keys(outerParams).forEach(v => {
                    //         formData.append(v, outerParams[v]);
                    //     });
                    //     data = formData
                    // }
                    let obj = {
                        name,
                        path,
                        desc,
                        baseURL,
                        url,
                        method
                    };
                    return axios(_normoalize(_assign(obj, _assign({}, options, outerOptions)), data))
                }
            })
        })
    }
}

function _normoalize(options, data) {
    if (options.method === 'POST') {
        options.data = data
    } else if (options.method === 'GET' || options.method === 'DELETE') {
        options.params = data
    }
    return options
}

function _firstUpperCase(str) {
    return str.replace(/\b(\w)/g, function ($1) {
        return $1.toUpperCase();
    })
}

export default new MakeApi({
    api: API,
    ...API_CONFIG
})['api']