const userService = require('./lib/user-service');

const authenticator = {
    login: (userName, password) => {
        return authenticator.loginUser(userService.getUserByName(userName), password);
    },

    loginUser: (user, password) => {
        if (userService.isPasswordCorrect(user, password)) {
            return user;
        }
        throw Error("Wrong Password.");
    }
};

module.exports = authenticator;
