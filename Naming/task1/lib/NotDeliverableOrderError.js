module.exports = class NotDeliverableOrderError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotDeliverableOrderError';
    }
};
