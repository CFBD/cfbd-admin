const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

const expressSession = require('express-session');

const authRoutes = require('./auth/routes');

module.exports = (db, passport) => {
    const app = express();
    app.use(helmet());

    app.enable('trust proxy');

    const session = {
        secret: 'LoxodontaElephasMammuthusPalaeoloxodonPrimelephas',
        cookie: {},
        resave: false,
        saveUninitialized: false
    };

    if (process.env.NODE_ENV === 'production') {
        // Serve secure cookies, requires HTTPS
        session.cookie.secure = true;
    }

    app.use(expressSession(session));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    if (process.env.NODE_ENV === 'development') {
        app.use(cors());
    }

    // routes
    authRoutes(app, passport);
    // routes(app, db, auth);

    app.use(history());

    app.use(express.static(path.join(__dirname, '../dist')));
    app.use('/css', express.static(path.join(__dirname, '../dist/css')));
    app.use('/img', express.static(path.join(__dirname, '../dist/img')));
    app.use('/js"', express.static(path.join(__dirname, '../dist/js')));

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/dist/index.html')); // eslint-disable-line
    });

    return app;
};
