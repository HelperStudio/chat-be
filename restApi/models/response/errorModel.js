class ErrorModel {
    constructor(httpCode, errors) {
        this.httpCode = httpCode;
        this.errors = errors;
    }
}

class ErrorItemModel {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

module.exports = {
    ErrorItem: ErrorItemModel,
    ErrorModel: ErrorModel
}