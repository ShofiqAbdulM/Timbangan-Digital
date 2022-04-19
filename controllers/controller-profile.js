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
                        url: 'http://localhost:5050/',
                        // username: req.session.username,
                        nama: req.body.username,
                        password: req.body.password
                        // email: results[0]['email']
                    });
                });
            connection.release();
        })
    }
}