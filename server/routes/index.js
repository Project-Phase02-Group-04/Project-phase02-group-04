const router = require('express').Router();
const { UserController } = require('../controllers');
const { Auth } = require('../middlewares');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/news', Auth.check, UserController.getNews);

module.exports = router;