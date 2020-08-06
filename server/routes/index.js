const router = require('express').Router();
const { UserController } = require('../controllers');
const { Auth } = require('../middlewares');

router.get('/user', UserController.)