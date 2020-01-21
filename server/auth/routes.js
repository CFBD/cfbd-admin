const crypto = require('crypto');
const authController = require('./controller');

module.exports = (app, passport) => {
    const controller = authController(passport, crypto);

    app.route('/login').get(controller.auth0);
    app.route('/auth/auth0/callback').get(controller.auth0Callback);
    app.route('/logout').get(controller.logout);
    app.route('/api/profile').get(controller.getProfile);
};
