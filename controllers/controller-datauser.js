module.exports = {
    datauser(req, res) {
        res.render("datauser", {
            url: 'http://localhost:5050/',
            user: req.session.username,
        });
    }
}