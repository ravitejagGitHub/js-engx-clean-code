module.exports = class CustomerContactService {
    constructor(customerContactDAO) {
        this.customerContactDAO = customerContactDAO;
    }

    findDetailsById(customerId) {
        return this.customerContactDAO.findById(customerId);
    }

    updateDetails(details) {
        this.customerContactDAO.update(details);
    }
};
