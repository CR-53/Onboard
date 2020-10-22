const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
        this.signup(app, db);
    }

    login(app, db) {

        app.post('/login', (req, res) => {
            let username = req.body.username;
            let password = req.body.password;

            username = username.toLowerCase();

            if (username.length > 15 || password.length > 15) {
                res.json({
                    success: false,
                    msg: 'An error occured, please try again.'
                });
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: 'An error occured, please try again.'
                    });
                    return;
                }
                // Found 1 user with this username
                if (data && data.length === 1) {

                    bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                        if (verified) {
                            req.session.userID = data[0].id;

                            res.json({
                                success: true,
                                username: data[0].username
                            })
                            return;
                        }

                        else {
                            res.json({
                                success: false,
                                msg: 'Invalid password'
                            })
                        }
                    });

                } else {
                    res.json({
                        success: false,
                        msg: 'User not found, please try again'
                    })
                }

            });

        });

    }

    signup(app, db) {

        app.post('/signup', (req, res) => {
            let username = req.body.username;
            let password = bcrypt.hashSync(req.body.password, 9);

            username = username.toLowerCase();

            if (username.length > 15) {
                res.json({
                    success: false,
                    msg: '1) An error occured, please try again.'
                });
                return;
            }

            let cols = [username];
            db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
                if (err) {
                    res.json({
                        success: false,
                        msg: '2) An error occured, please try again.'
                    });
                    return;
                }
                // Found 1 user with this username
                if (data && data.length === 1) {
                    res.json({
                        success: false,
                        msg: `3) A user with this username already exists.`
                    })
                    return;
                }
                else {
                    db.query('INSERT INTO user SET ?',
                        {
                            username: username,
                            password: password
                        },
                        (err, data, fields) => {
                            if (err) {
                                res.json({
                                    success: false,
                                    msg: '4) An error occured, please try again.'
                                });
                                return;
                            } else {
                                res.json({
                                    success: true,
                                    msg: 'new user regisered'
                                })

                                let cols = [username];
                                db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {
                                    if (err) {
                                        res.json({
                                            success: false,
                                            msg: 'An error occured, please try again.'
                                        });
                                        return;
                                    }
                                    // Found 1 user with this username
                                    if (data && data.length === 1) {

                                        bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {
                                            if (verified) {
                                                req.session.userID = data[0].id;

                                                res.json({
                                                    success: true,
                                                    username: data[0].username
                                                })
                                                return;
                                            }

                                            else {
                                                res.json({
                                                    success: false,
                                                    msg: 'Invalid password'
                                                })
                                            }
                                        });

                                    }

                                })

                            }

                        });

                };
            })
        });
    }

    logout(app, db) {

        app.post('/logout', (req, res) => {
            if (req.session.userID) {
                req.session.destroy();
                res.json({
                    sucess: true
                })
                return true;

            } else {
                res.json({
                    success: false
                })
                return false;
            }
        })

    }

    isLoggedIn(app, db) {

        app.post('/isLoggedIn', (req, res) => {

            if (req.session.userID) {

                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE id = ? LIMIT 1', cols, (err, data, fields) => {

                    if (data && data.length === 1) {
                        res.json({
                            success: true,
                            username: data[0].username
                        })
                        return true;

                    } else {
                        res.json({
                            success: false
                        })
                    }

                });
            }

            else {
                res.json({
                    success: false
                })
            }
        })

    }

}

module.exports = Router;