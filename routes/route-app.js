const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const keloladrivController = require('../controllers').kd;
const emailController = require('../controllers').email;
const datauserController = require('../controllers').datauser;

const verifyUser = require('../config/verify');
const { route } = require('./route-login');

router.get('/', verifyUser.isLogin, homeController.home);

//Profile
router.get('/profile', verifyUser.isLogin, profileController.profile);
router.get('/profileEdit/(: id)', verifyUser.isLogin, profileController.EditProfile);
router.post('/profileUpdate/(: id)', verifyUser.isLogin, profileController.UpdateProfile);

//Kelola Driver
router.get('/keloladriver', verifyUser.isLogin, keloladrivController.kd);

//Email
router.get('/email', verifyUser.isLogin, emailController.email);

//data user
router.get('/datauser', verifyUser.isLogin, datauserController.datauser)
module.exports = router;