module.exports = class MissingConfigFileError extends Error {
    constructor(s) {
        super(s);
        this.message = s;
    }
};
