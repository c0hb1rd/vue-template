/**
 * Created by c0hb1rd on 2017/9/4.
 */
import {BasePYRequest} from '../api/core/BasePYRequest'


class AuthRequest extends BasePYRequest {
    constructor() {
        super();
        this.urls = {
            auth: {
                login: '/ctrl/auth/check',
                logout: '/ctrl/auth/logout'
            }
        }
    }

    login(params) {
        return this.post(this.urls.auth.login, params)
    }

    logout() {
        return this.get(this.urls.auth.logout)
    }
}

export const authRequest = new AuthRequest();
