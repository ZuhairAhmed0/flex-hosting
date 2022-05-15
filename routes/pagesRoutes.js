const router = require('express').Router();
const {requireAuth} = require('../middlewares/authMiddlewares');
router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/about', requireAuth, (req, res, next) => {
    res.render('about');
});

router.get('/hosting', requireAuth, (req, res, next) => {
    res.render('hosting');
});

router.get('/contact', requireAuth, (req, res, next) => {
    res.render('contact');
});


module.exports =  router;