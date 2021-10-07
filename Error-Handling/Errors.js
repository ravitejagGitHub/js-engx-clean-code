
class DAOException extends Error {
    constructor(message) {
        super(message);
        this.name = "DBConnectionError";
    }
}
class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidUser";
    }
}

class OrderNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidOrder";
    }
}
class WrongOrderAmountError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidOrderAmount";
    }
}
module.exports = {
    DAOException,
    UserNotFoundError,
    OrderNotFoundError,
    WrongOrderAmountError
}
