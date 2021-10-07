module.exports = class WrongAccountNameException extends Error {
    constructor(message) {
        super(message);
        this.name = 'WrongAccountNameException';
    }
};
