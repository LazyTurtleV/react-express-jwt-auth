import { getDefaultFetchConfig } from '../utils/http';
import HttpService from './HttpService';
class DataService extends HttpService {
    async getData(accessToken) {
        return fetch(`${this.apiBase}/user-data`, {
            method: 'GET',
            ...getDefaultFetchConfig(accessToken),
        }).then(this.handleRequest);
    }
}

export default new DataService();