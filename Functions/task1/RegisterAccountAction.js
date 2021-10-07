const WrongAccountNameException = require('./lib/WrongAccountNameException');
const WrongPasswordException = require('./lib/WrongPasswordException');
const MIN_PASSWORD_LENGTH = 8;
const MIN_ACCOUNT_NAME_LENGTH = 5;
module.exports = class RegisterAccountAction {

    constructor() {
        this.passwordChecker = null;
        this.accountManager = null;
    }

    register(account) {
        try {
            this.validateAccount(account)
            this.createAccount(account);
        } catch(e) {
            console.log(e);
        }
    }

    createAccount(account) {
        account.setCreatedDate(new Date());
        this.addAddresses(account);
        this.accountManager.createNewAccount(account);
    }

    addAddresses(account) {
        const addresses = new Set();
        addresses.add(account.getHomeAddress());
        addresses.add(account.getWorkAddress());
        addresses.add(account.getAdditionalAddress());
        account.setAddresses(addresses);
    }

    validateAccountName(account) {
        if (account.name.length <= MIN_ACCOUNT_NAME_LENGTH) {
            throw new WrongAccountNameException(account.name);
        }
    }
    validatePasword(account) {
        const password = account.password;
        if (password.length <= MIN_PASSWORD_LENGTH) {
            if (this.passwordChecker.validate(password) !== this.passwordChecker.result.OK) {
                throw new WrongPasswordException();
            }
        }
    }

    validateAccount(account) {
        try {
            this.validateAccountName(account);
            this.validatePasword(account)
        }
        catch (e) {
            throw e;
        }
    }

    setAccountManager(accountManager) {
        this.accountManager = accountManager;
    }

    setPasswordChecker(passwordChecker) {
        this.passwordChecker = passwordChecker;
    }
};

