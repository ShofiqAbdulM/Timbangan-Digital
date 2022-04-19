module.exports = {
    home(req, res) {
        res.render("home", {
            url: 'http://localhost:5050/',
            username: req.session.username,
        });
    }
}