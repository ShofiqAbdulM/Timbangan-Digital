const config = require('../config/db');

let mysql = require('mysql');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    // Render tampilan untuk login yang ada didalam folder 'src/views/login.ejs'
    login(req, res) {
        res.render("login", {
            url: 'http://localhost:5050/',
            // Kirim juga library flash yang telah di set
            colorFlash: req.flash('color'),
            statusFlash: req.flash('status'),
            pesanFlash: req.flash('message'),
        });
    },
    // Post / kirim data yang diinput user
    loginAuth(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        if (username && password) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `SELECT * FROM user_login WHERE username = ? AND password = SHA2(?,512)`
                    , [username, password], function (error, results) {
                        if (error) throw error;
                        if (results.length > 0) {
                            // Jika data ditemukan, set sesi user tersebut menjadi true
                            req.session.loggedin = true;
                            req.session.id = results[0].id;
                            req.session.email = results[0].email;
                            res.redirect('/');
                        } else {
                            // Jika data tidak ditemukan, set library flash dengan pesan error yang diinginkan
                            req.flash('color', 'danger');
                            req.flash('status', 'Oops..');
                            req.flash('message', 'Akun tidak ditemukan');
                            res.redirect('/login');
                        }
                    });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    },
    // Fungsi untuk logout | Cara memanggilnya menggunakan url/rute 'http://localhost:5050/login/logout'
    logout(req, res) {
        // Hapus sesi user dari broser
        req.session.destroy((err) => {
            if (err) {
                return console.log(err);
            }
            // Hapus cokie yang masih tertinggal
            res.clearCookie('secretname');
            res.redirect('/login');
        });
    },
}