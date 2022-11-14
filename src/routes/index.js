const newsRouter = require('./news.route');
const siteRouter = require('./site.route');

function route(app) {
    app.use('/', siteRouter);
    app.use('/news', newsRouter);
}

module.exports = route;
