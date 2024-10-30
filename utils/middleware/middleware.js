const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');
const morgan = require('morgan');
const methodOverride = require('method-override');



module.exports = (app) => {
    // Body parser middleware
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Cookie parser middleware
    app.use(cookieParser());

    // Session middleware
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // secure cookies in production
            maxAge: 60000,
        }
    }));



    // CORS middleware
    const corsOptions = {
        origin: process.env.APP_URI,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    };

    app.use(cors(corsOptions));

    // HTTP request logger middleware
    // app.use(morgan('dev'));

    app.use(methodOverride('_method'));

};