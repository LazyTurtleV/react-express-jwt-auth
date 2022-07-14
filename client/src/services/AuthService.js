import Cookie from 'js-cookie';

import { getDefaultFetchConfig } from '../utils/http';
import HttpService from './HttpService';

class AuthService extends HttpService {
    constructor(){
        super();
        this.token = Cookie.get('token');
    }

    saveAccessToken(token) {
        Cookie.set('token', token);
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    async registration(email, password) {
        const { accessToken } = await fetch(`${this.apiBase}/registration`, {
            method: 'POST',
            ...getDefaultFetchConfig(),
            body: JSON.stringify({
                email,
                password,
            }),
        }).then(this.handleRequest)
        this.saveAccessToken(accessToken);
    }

    async login(email, password) {
        const { accessToken } = await fetch(`${this.apiBase}/login`, {
            method: 'POST',
            ...getDefaultFetchConfig(),
            body: JSON.stringify({
                email,
                password,
            }),
        }).then(this.handleRequest);
        this.saveAccessToken(accessToken);
    }

    async logout() {
        await fetch(`${this.apiBase}/logout`, {
            method: 'POST',
            ...getDefaultFetchConfig(),
            body: JSON.stringify({}),
        }).then(this.handleRequest);
    }

    async refresh() {
        const { accessToken } = await fetch(`${this.apiBase}/refresh`, {
            method: 'GET',
            ...getDefaultFetchConfig(this.token),
        }).then(this.handleRequest);
        this.saveAccessToken(accessToken);
    }
};

export default new AuthService();