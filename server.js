// Definisi Library yang digunakan
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('req-flash');
const app = express();

// Definisi lokasi file router
const loginRoutes = require('./routes/route-login');
const RegisRoutes = require('./routes/route-register');
const appRoutes = require('./routes/route-app');

const cors = require('cors')

app.use(cors())

// Configurasi dan gunakan library
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Configurasi library session
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'R A H A S I A',
    name: 'secretName',
    cookie: {
        sameSite: true,
        maxAge: 600000
    },
}))
app.use(flash());

// Setting folder views
app.use(express.static(__dirname + '/static'));

app.set('views', path.join(__dirname, 'views/pages/'));
// app.set('views', path.join(__dirname, 'views/pages/atasan'));
// app.set('views', path.join(__dirname, 'views/pages/pegawai'));
app.set('view engine', 'ejs');

// Gunakan routes yang telah didefinisikan
app.use('/login', loginRoutes);
app.use('/register', RegisRoutes);
app.use('/', appRoutes);

// Gunakan port server
app.listen(5050, () => {
    console.log('Server Berjalan di Port : ' + 5050);
});
