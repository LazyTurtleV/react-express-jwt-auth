class HttpService {
    constructor() {
        //otherwise this is undefined inside the function
        this.handleRequest = this.handleRequest.bind(this);
    }

    init({ apiBase }) {
        this.apiBase = apiBase;
    }

    errorHandlers = [];

    async handleRequest(r) {
        if (r.status !== 200) {
            console.log('ERR CAUGHT', r.status, r.statusText);

            for (const handler of this.errorHandlers) {
                await handler(r);
            }

            return;
        }

        return r.json();
    }

    subscribeOnError(callback) {
        this.errorHandlers.push(callback);
    }

    subscribeOnUnauthorizedError(callback) {
        const handler = async (r) => {
            if (r.status === 401) {
                await callback(r);
            }
        }

        this.subscribeOnError(handler);
    }

    subscribeOnBadRequestError(callback) {
        const handler = async (r) => {
            if (r.status === 400) {
                await callback(r);
            }
        }

        this.subscribeOnError(handler);
    }
}

export default HttpService;