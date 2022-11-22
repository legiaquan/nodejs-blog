const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middleware/SortMiddleware');
const app = express();
const port = 3030;

const route = require('./routes');
const db = require('./config/db');

// Connect db
db.connect();

// middleware
app.use(SortMiddleware);

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
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : 'default';

                const icons = {
                    default: 'fas fa-sort',
                    asc: 'fas fa-sort-up',
                    desc: 'fas fa-sort-down',
                };

                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `
                    <a href="?_sort&column=${field}&type=${type}" class="${icon}"></a>
                `;
            },
        },
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
