const { DAOException } = require('./Errors');

module.exports = class UserReportController {
    constructor() {
        this.userReportBuilder = null;
    }

    getUserTotalOrderAmountView(userId, model) {
        try {
            const totalMessage = this.getUserTotalMessage(userId);
            model.addAttribute('userTotalMessage', totalMessage);
            return 'userTotal';
        } catch (error) {
            if (error instanceof DAOException) {
                return 'technicalError';
            }
            console.log(`Error : ${error}` );
        }
    }

    getUserTotalMessage(userId) {
        try {
            const amount = this.userReportBuilder.getUserTotalOrderAmount(userId);
            return `User Total: ${amount}$`;
        } catch (error) {
            if (error instanceof DAOException) {
                throw error;
            }
            return error.message;
        }
    }

    getUserReportBuilder() {
        return this.userReportBuilder;
    }

    setUserReportBuilder(userReportBuilder) {
        this.userReportBuilder = userReportBuilder;
    }
}
