module.exports = class CustomerContact {
    constructor(customerId, emailId, contactNumber, alternateContactNumber) {
        this.customerId = customerId;
        this.emailId = emailId;
        this.contactNumber = contactNumber;
        this.alternateContactNumber = alternateContactNumber;
    }

    getCustomerId() {
        return this.customerId;
    }

    setCustomerId(customerId) {
        this.customerId = customerId;
    }

    getEmailId() {
        return this.emailId;
    }

    setEmailId(emailId) {
        this.emailId = emailId;
    }

    getContactNumber() {
        return this.contactNumber;
    }

    setContactNumber(contactNumber) {
        this.contactNumber = contactNumber;
    }

    getAlternateContactNumber() {
        return this.alternateContactNumber;
    }

    setAlternateContactNumber(alternateContactNumber) {
        this.alternateContactNumber = alternateContactNumber;
    }
};
