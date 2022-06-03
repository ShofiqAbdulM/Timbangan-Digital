const mysql = require('mysql2')

const user = process.env['DBUSER']
const password = process.env['DBPASSWD']
const host = process.env['DBHOST']
const database = process.env['DATABASE']

// console.log(user)

const db = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    database: database,
    multipleStatements: true
})

db.connect((err) => {
    if (err) throw err
    console.log('Mysql Connected...')
})

module.exports = db
