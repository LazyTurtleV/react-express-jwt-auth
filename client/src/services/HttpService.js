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
}

export default HttpService;