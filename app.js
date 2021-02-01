const path = require('path');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');
const colors = require('colors');

// Load config
const configFile = './config/config.env';
if (fs.existsSync(configFile)) {
  dotenv.config({ path: configFile });
  console.log('Loaded configuration file by path', configFile);
} else {
  console.log(
    'No configuration file found by path, using the default environment configuration. Tried path: ',
    configFile
  );
}

// Make sure we have required environment variables
if (!process.env.MONGO_URI) {
  console.log(
    'MONGO_URI environment variable is not set. Please set in file ' +
      configFile +
      ' or by other means. Existing...'
  );
  return;
}

// Passport config
require('./config/passport')(passport);

connectDB();
const app = express();

// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars helpers
const { formatDate, select } = require('./helpers/hbs');

// Handlebars
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      select
    },
    defaultLayout: 'main',
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');

// Sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/transactions', require('./routes/transactions'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}!`.yellow
      .bold
  );
});
