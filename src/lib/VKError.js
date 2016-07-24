export default class VKError extends Error {
    constructor(error, error_code) {
        super();
        this.name = 'VKError';
        this.message = error;
        this.error_code = error_code;
        this.stack = (new Error()).stack;
    }
}
