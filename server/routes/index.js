const router = require('express').Router();
const { UserController } = require('../controllers');
const { Auth } = require('../middlewares');

router.post('/login',UserController.login)
router.post('/register',UserController.register)
router.get('/', Auth.check, UserController.getNews)
router.post('/googleoauth',UserController.googleOauth)

module.exports= router