const db = require("../../../config/db")
const mail = require("../../../helper/send.email")

exports.store = async (req, res, next) => {
    try {
        const data = { ...req.body }
        var berat = req.body.berat
        const query = 'INSERT INTO berat SET ?; ' +
            'SELECT * FROM user WHERE role = "superadmin";'

        db.query(query, data, (err, result, filed) => {
            if (err) {
                return res.status(500).json({
                    status: 'failed',
                    message: 'Gagal insert data!',
                    error: err
                })
            }

            const payload = {
                email: result[1][0].email,
                load: berat,
                date: result[1][0].created_at
            }
            mail.sendEmailTimbangan(payload)
            var id = result[0].insertId
            var queryBerat = "SELECT berat.*, date_format(berat.created_at, '%d-%m-%Y') as tanggal, driver.nama as driver, user.nama as pic FROM berat" +
                " JOIN driver ON berat.id_driver = driver.id" +
                " JOIN user ON berat.id_user = user.id WHERE berat.id = ?"
            db.query(queryBerat, id, (err, result, filed) => {
                return res.status(200).json({
                    status: 'success',
                    message: 'Berhasil insert data!',
                    error: '',
                    data: result
                })
            })
        })
    } catch (error) {
        return res.status(500).json({
            status: 'failed',
            message: 'Gagal insert data!',
            error: error.body
        })
    }
}