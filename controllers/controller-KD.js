module.exports = {
    kd(req, res) {
        res.render("keloladriver", {
            url: 'http://localhost:5050/',
            user: req.session.username,
        });
    }
}