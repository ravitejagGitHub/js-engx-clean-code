module.exports = class InvalidFileTypeError extends Error {
    constructor(s) {
        super();
        this.message = s;
    }
};
