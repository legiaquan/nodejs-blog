class NewsController {
    // [GET] /news
    index(req, res) {
        res.render('news');
    }

    show(req, res, slug) {
        console.log('req.params: ', req.params);
        res.send('news detail');
    }
}

module.exports = new NewsController();
