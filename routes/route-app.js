const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const verifyUser = require('../config/verify');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/profileEdit/(: id)', verifyUser.isLogin, profileController.EditProfile);
router.post('/profileUpdate/(: id)', verifyUser.isLogin, profileController.UpdateProfile);
module.exports = router;