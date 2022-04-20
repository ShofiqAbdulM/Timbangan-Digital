const config = require('../config/db');

let mysql = require('mysql');
const { password } = require('../config/db');
let pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    profile(req, res) {
        let id = req.session.id
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM user_login where id = '${id}';
                `
                , function (error, results) {
                    if (error) throw error;
                    res.render("profile", {
                        url: 'http://localhost:8080/',
                        // username: req.session.username,
                        nama: req.body.username,
                        password: req.body.password
                        // email: results[0]['email']
                    });
                });
            connection.release();
        })
    },
    EditProfile(req, res) {
        let id = req.params.id;

        connection.query('SELECT * FROM user_login WHERE id = ' + id, function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Data Post Dengan ID ' + id + " Tidak Ditemukan")
                res.redirect('/profile')
            }
            // if book found
            else {
                // render to edit.ejs
                res.render('profileEdit', {
                    id: rows[0].id,
                    username: rows[0].username,
                    password: rows[0].password,
                    email: rows[0].email,
                    role: rows[0].role

                })
            }
        })
    },
    UpdateProfile(req, res, next) {

        let id = req.params.id;
        let username = req.body.username;
        let password = req.body.password;
        let email = req.body.email;
        let role = req.body.role;

        let errors = false;

        if (username.length === 0) {
            errors = true;

            // set flash message
            req.flash('error', "Silahkan Masukkan Username");
            // render to edit.ejs with flash message
            res.render('profileEdit', {
                id: req.params.id,
                username: username,
                password: password,
                email: email,
                role: role
            })
        }

        if (password.length === 0) {
            errors = true;

            // set flash message
            req.flash('error', "Silahkan Masukkan Password");
            // render to edit.ejs with flash message
            res.render('profileEdit', {
                id: req.params.id,
                username: username,
                password: password,
                email: email,
                role: role
            })
        }

        // if no error
        if (!errors) {

            let formData = {
                username: username,
                password: password,
                email: email,
                role: role
            }

            // update query
            connection.query('UPDATE user_login SET ? WHERE id = ' + id, formData, function (err, result) {
                //if(err) throw err
                if (err) {
                    // set flash message
                    req.flash('error', err)
                    // render to edit.ejs
                    res.render('profileEdit', {
                        id: req.params.id,
                        username: formData.username,
                        password: formData.password,
                        email: formData.email,
                        role: formData.role
                    })
                } else {
                    req.flash('success', 'Data Berhasil Diupdate!');
                    res.redirect('/profile');
                }
            })
        }
    }
}
