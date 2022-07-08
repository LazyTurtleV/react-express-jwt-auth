const Router = require('express').Router;
const router = new Router(); 
const { body } = require('express-validator');


const userController = require('../Controllers/UserController');

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 32 }), 
    userController.register 
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/user-data', userController.getUserData);

module.exports = router;

