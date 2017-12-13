/**
 * Created by c0hb1rd on 2017/11/26.
 */
import {BasePYRequest} from '../api/core/BasePYRequest'


class SampleRequest extends BasePYRequest {
    constructor() {
        super();
        this.urls = {
            sample: {
                list: '/sample/list',
                content: '/sample/content',
                add: '/sample/add'
            }
        }
    }

    list(params) {
        return this.get(this.urls.sample.list, params)
    }

    content(params) {
        return this.get(this.urls.sample.content, params)
    }

    add(params) {
        return this.post(this.urls.sample.add, params)
    }
}

export const sampleRequest = new SampleRequest();
