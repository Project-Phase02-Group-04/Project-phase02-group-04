const router = require('express').Router();
const { UserController } = require('../controllers');
const { Auth } = require('../middlewares');

router.post('/login',UserController.login)
router.post('/register',UserController.register)

module.exports= router