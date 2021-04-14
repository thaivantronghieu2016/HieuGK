module.exports = {
    getLogin: (req, res) => {
        res.render('login.ejs', {
            title: 'Login',
            message: ''
        });
    },

    postLogin: (req, res) => {
        const {username, password} = req.body;
        const query = "select * from `user` where username='" + username + "' and password='" + password + "'";
        db.query(query, (err, result) => {
            if (err || result.length == 0) {
                res.redirect('/login');
            } else if (result.length > 0) {
                res.cookie('user-id', username);
                res.redirect('/');
            }
        });
        console.log(req.body);
    },

    getLogout: (req, res) => {
        res.clearCookie('user-id');
        res.redirect('/');
    }
}