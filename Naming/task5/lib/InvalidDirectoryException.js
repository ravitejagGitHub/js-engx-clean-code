module.exports = class InvalidDirectoryException extends Error {
    constructor(s) {
        super(s);
        this.message = s;
    }
};
