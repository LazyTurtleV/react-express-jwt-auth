const Router = require('express').Router;

const router = new Router(); 
const userController = require('../Controllers/UserController');

router.post('/registration', userController.register );
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/user-data', userController.getUserData);

module.exports = router;

