const auth0Strategy = require('./strategies/auth0');

module.exports = (passport) => {
    auth0Strategy(passport);

    passport.serializeUser((user, done) => {
        done(null, user);
      });

      passport.deserializeUser((user, done) => {
        done(null, user);
      });
};
