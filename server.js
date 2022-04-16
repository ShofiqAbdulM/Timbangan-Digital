var express = require('express');
var app = express();
const mysql = require('mysql');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'shofiq2001',
    database: 'Timbangan'
});

app.use(cookieParser());

app.use(session({
    secret: 'secret',
    resave: false,
    cookie: { maxAge: 60000 },
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('pages/login');
});

app.post('/login', function (request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;

    if (username && password) {
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/home');
            } else {
                response.redirect('/');
            }
            response.end();
        });
    } else {
        response.send('Please enter Username and Password!');
        response.end();
    }
});
app.get('/home', function (request, response) {
    if (request.session.loggedin) {

        response.render('pages/atasan/home');

    } else {

        response.redirect('/');
    }
    response.end();
});

app.get('/logout', function (req, res) {
    // clear the remember me cookie when logging out
    req.session = null;
    res.redirect('/');
});

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.listen(8080);
console.log('Server is listening on port 8080');