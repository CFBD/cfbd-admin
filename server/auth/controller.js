const querystring = require('querystring');

module.exports = (passport) => ({
    // authJwt: passport.authenticate('jwt', {
    //     session: false,
    //     successRedirect: '/',
    //     failureRedirect: '/'
    // }),
    // addTokenToCookie: (req, res) => {
    //     res.cookie('jwt', req.account ? req.account : req.user, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV !== 'development',
    //         domain: process.env.JWT_DOMAIN,
    //         maxAge: 7 * 24 * 60 * 60 * 1000
    //     });
    //     res.redirect('/auth');
    // }
    auth0: passport.authenticate('auth0', {
        scope: 'openid email profile edit',
        successRedirect: '/',
        failureRedirect: '/'
    }),
    auth0Callback: (req, res, next) => {
        passport.authenticate('auth0', (err, user, info) => { // eslint-disable-line
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.redirect('/login');
            }
            req.logIn(user, (err0) => { // eslint-disable-line
                if (err0) {
                    return next(err0);
                }
                const {
                    returnTo
                } = req.session;
                delete req.session.returnTo; // eslint-disable-line
                res.redirect(returnTo || '/');
            });
        })(req, res, next);
    },
    logout: (req, res) => {
        req.logOut();

        let returnTo = `${req.protocol}://${req.hostname}`;
        const port = req.connection.localPort;

        if (port !== undefined && port !== 80 && port !== 443) {
            returnTo = process.env.NODE_ENV === 'production'
                    ? `${returnTo}/`
                    : `${returnTo}:${port}/`;
        }

        const logoutURL = new URL(`http://${process.env.AUTH0_DOMAIN}/logout`);
        const searchString = querystring.stringify({
            client_id: process.env.AUTH0_CLIENT_ID,
            returnTo
        });
        logoutURL.search = searchString;

        res.redirect(logoutURL);
    },
    getProfile: (req, res) => {
        if (req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send(null);
        }
    }
});
