const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3030;

const route = require('./routes');
const db = require('./config/db');

// Connect db
db.connect();

// define the public folder
app.use(express.static(path.join(__dirname, 'public')));

// show log access
app.use(morgan('combined'));

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

// configure get body form
// if express is <4.16, please install https://www.npmjs.com/package/body-parser
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json()); // for API requests and Ajax

// configure express handlebars
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
