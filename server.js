var express = require('express');
var app = express();
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require("cookie-parser");
const flash = require('connect-flash')
const fileUpload = require('express-fileupload');
const path = require('path')

require('dotenv').config({ path: __dirname + '/.env' })

app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    cookie: { maxAge: 60000 },
    saveUninitialized: true
}));

app.use(flash())
app.use(fileUpload())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
// app.use(express.static(__dirname + '/public'));

// use res.render to load up an ejs view file

// index page
// app.get('/', function (req, res) {
//     res.render('pages/login');
// });

//import route
app.use(function (req, res, next) {
    var cookie = req.cookies
    var role = cookie.role
    var nama = cookie.nama
    var gambar = cookie.gambar
    var url = req.originalUrl
    res.locals.nama = nama
    res.locals.role = role
    res.locals.url = url
    res.locals.gambar = gambar
    next();
});
app.use(require('./routes'),)

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// var port = process.env['PORT']
// app.listen(port);
// // https.createServer(options, function (req, res) {
// //     // res.writeHead(200);
// //     // res.end("hello world\n");
// //   }).listen(port);
// console.log("Server is listening on port " + port);
app.listen(5050, () => {
    console.log('Server Berjalan di Port : ' + 5050);
});