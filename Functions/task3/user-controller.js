const userAuthenticator = require('./user-authenticator');
const sessionManager = require('./lib/session-manager');
const controller = require('./lib/controller');

module.exports = {
    authenticateUser: (userName, password) => {
        try {
            userAuthenticator.login(userName, password);
            sessionManager.setCurrentUser(user);
            controller.generateSuccessLoginResponse(userName);
        } catch (e) {
            controller.generateFailLoginResponse();
        }
    }
};
