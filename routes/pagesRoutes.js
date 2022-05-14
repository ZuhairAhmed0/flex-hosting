const router = require('express').Router();
const {requireAuth} = require('../middlewares/authMiddlewares');
router.get('/', requireAuth, (req, res, next) => {
    res.render('index');
});

router.get('/about', (req, res, next) => {
    res.render('about');
});

router.get('/hosting', (req, res, next) => {
    res.render('hosting');
});

router.get('/contact', (req, res, next) => {
    res.render('contact');
});


module.exports =  router;