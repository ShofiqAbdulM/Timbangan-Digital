const login = require('./controller-login');
const home = require('./controller-home');
const profile = require('./controller-profile');
const register = require('./controller-register');
const kd = require('./controller-KD');
const email = require('./controller-email');
const datauser = require('./controller-datauser');

module.exports = {
    login,
    home,
    register,
    profile,
    kd,
    email,
    datauser
};