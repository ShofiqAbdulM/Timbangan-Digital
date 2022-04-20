module.exports = {
    email(req, res) {
        res.render("email", {
            url: 'http://localhost:5050/',
            user: req.session.username,
        });
    }
}