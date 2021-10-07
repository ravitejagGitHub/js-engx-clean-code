const { DAOException, OrderNotFoundError, UserNotFoundError, WrongOrderAmountError } = require('./Errors');
const MINIMUM_ORDER_AMOUNT = 0;
module.exports = class UserReportBuilder {
    constructor() {
        this.userDao = null;
    }

    getUser(userId) {
        const user = this.userDao.getUser(userId);
        if (user === null) {
            throw new UserNotFoundError(`WARNING: User ID doesn\'t exist.`);
        }
        return user;
    }

    checkUserDAO() {
        if (this.userDao === null) {
            throw new DAOException('user DAO is undefined.');
        }
    }

    getUser(userId) {
        const user = this.userDao.getUser(userId);
        if (user === null) {
            throw new UserNotFoundError(`WARNING: User ID doesn\'t exist.`);
        }
        return user;
    }

    getOrders(user) {
        const orders = user.getAllOrders();
        if (!orders.length) {
            throw new OrderNotFoundError(`WARNING: User have no submitted orders.`);
        }
        return orders;
    }

    getUserTotalOrderAmount(userId) {
        try {
            this.checkUserDAO();
            const user = this.getUser(userId);
            const orders = this.getOrders(user);
            let sum = 0;
            for (let order of orders) {
                if (order.isSubmitted()) {
                    const total = order.total();
                    if (total < MINIMUM_ORDER_AMOUNT)
                        throw new WrongOrderAmountError(`ERROR: Wrong order amount.`);
                    sum += total;
                }
            };
            return sum;
        } catch (error) {
            throw error;
        }

    }

    getUserDao() {
        return this.userDao;
    }

    setUserDao(userDao) {
        this.userDao = userDao;
    }
}
