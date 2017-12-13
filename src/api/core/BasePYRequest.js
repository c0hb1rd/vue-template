/**
 * Created by c0hb1rd on 2017/9/4.
 */
import axios from 'axios';
import {router} from '../../router/index'
import Qs from 'qs'

import {Message} from 'element-ui'
import {showAlter} from "../../utils/styleFunc";

let $t = require('vue-i18n');


export const PYREQUEST = axios.create({
    baseURL: 'http://localhost:8899',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        // 'withCredentials':true
    },
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    timeout: 10000
});

PYREQUEST.defaults.withCredentials = true;

// respone拦截器
PYREQUEST.interceptors.response.use(
    response => {
        if (response.data.result === 'permission') {
            showAlter({
                type: 'error',
                message: '没有权限'
            });

            router.push('/')
        }

        return response;
    }
);

PYREQUEST.timeout = () => {

};

export class BasePYRequest {
    constructor() {
        this.urls = {}
    }

    get(url, params) {
        return PYREQUEST.get(url, {params: params})
    }

    post(url, params) {
        return PYREQUEST.post(url, params)
    }

    responseProcess(res, callback) {
        switch (res.data.result) {
            case 'success':
                callback.success ? callback.success() : '';
                break;
            case 'error':
                callback.error ? callback.error() : '';
                break;
            case 'timeout':
                Message({
                    type: 'warning',
                    message: '请求超时'
                });
                break;
            case 'permission':
                callback.permission ? callback.permission() : showAlter({
                    type: 'error',
                    message: '没有权限'
                });
                break;
            case 'warning':
                Message({
                    type: 'warning',
                    message: res.data.data
                });
                break;
            default:
                callback._default ? callback._default() : ''
        }
    }

    initAjax(m) {
        return {
            get: (params) => {
                return this.get(m.get, params)
            },
            add: (params) => {
                return this.post(m.add, params)
            },
            del: (params) => {
                return this.post(m.del, params)
            },
            edit: (params) => {
                return this.post(m.edit, params)
            }
        }
    };
}
