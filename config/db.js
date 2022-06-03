const mysql = require('mysql2')

// console.log(user)

const db = mysql.createConnection({
    multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: 'shofiq2001',
    database: 'Timbangan'
})

db.connect((err) => {
    if (err) throw err
    console.log('Mysql Connected...')
})

module.exports = db