const Auth0Strategy = require('passport-auth0').Strategy;

module.exports = (passport) => {
    const webHost = process.env.WEB_HOST;
    const clientID = process.env.AUTH0_CLIENT_ID;
    const domain = process.env.AUTH0_DOMAIN;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    passport.use(new Auth0Strategy({
        domain,
        clientID,
        clientSecret,
        callbackURL: `http://${webHost}/auth/auth0/callback`
    }, (accessToken, refreshToken, extraParams, profile, done) => {
        const customKeys = Object.keys(profile._json).filter(k => !k.indexOf('https://collegefootballdata.com/')); // eslint-disable-line
        for (const key of customKeys) {
            const realKey = key.replace('https://collegefootballdata.com/', '');
            profile[realKey] = profile._json[key]; // eslint-disable-line
        }

        return done(null, profile);
    }));
};
