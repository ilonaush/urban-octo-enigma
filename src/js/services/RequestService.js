import axios from 'axios';

export class RequestService {
    constructor() {
        let service = axios.create({
            baseURL: 'http://localhost:5000',
        });
        service.interceptors.response.use(this.handleSuccess, this.handleError);
        this.service = service;
    }

    handleSuccess(response) {
        return response;
    }

    handleError = (error) => {
        if (error.response.status && document) {
            switch (error.response.status) {
                case 401:
                    this.redirectTo(document, '/');
                    break;
                case 404:
                    this.redirectTo(document, '/404');
                    break;
                default:
                    this.redirectTo(document, '/500');
                    break;
            }
        }
        return Promise.reject(error)
    };

    redirectTo = (document, path) => {
        document.location = path;
    };

    get(path, params='') {
        return this.service.get(path, {
            params: params
        })
    }

    patch(path, payload) {
        return this.service.request({
            method: 'patch',
            url: path,
            responseType: 'json',
            data: payload
        });
    }

    post(path, payload) {
        return this.service.request({
            method: 'post',
            url: path,
            responseType: 'json',
            data: payload
        });
    }
}

export default new RequestService();
