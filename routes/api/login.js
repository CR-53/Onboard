const User = require('../../models/user');
const UserSession = require('../../models/userSession')

module.exports = (app) => {
    app.post(`/api/account/signup`, (req, res, next) => {
        console.log(`inside api`)
        let username = req.body.username;
        let password = req.body.password;

        username = username.toLowercase;

        if (!username) {
            res.end({
                success: false,
                message: 'Error: No username can be found'
            })
            return;
        }
        if (!password) {
            res.end({
                success: false,
                message: 'Error: No password can be found'
            })
            return;
        }

        // Steps:
        // 1. Verify username doesn't exists
        // 2. Save
        User.find({
            username: username
        }, (err, previousUsers) => {
            if (err) {
                res.end({
                    success: false,
                    message: 'Error: Server error'
                });
                return;
            }
            else if (previousUsers.length > 0) {
                res.end({
                    success: false,
                    message: 'Error: Username already exists'
                });
                return;
            }

            // const newUser = new User();
            // newUser.username = username;
            // newUser.password = newUser.generateHash(password);
            const hashedPassword = passowrd.generateHash(password);

            User.save({
                usnername: username,
                password: hashedPassword
            },(err, user) => {
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: Server error'
                    });
                    return;
                }
                res.end({
                    success: true,
                    message: 'Signed up'
                })
                console.log(`new user saved ` + username + password)
                return;
            });
        });
    });

    app.post(`/api/account/login`, (req, res, next) => {
        let username = req.body.username;
        let password = req.body.password;

        username = username.toLowercase;

        if (!username) {
            res.end({
                success: false,
                message: 'Error: No username can be found'
            })
            return;
        }
        if (!password) {
            res.end({
                success: false,
                message: 'Error: No password can be found'
            })
            return;
        }

        User.find({
            username: username
        }, (err, users) => {
            if (err) {
                res.end({
                    success: false,
                    message: 'Error: server error'
                })
                return;
            }
            if (user.length !== 1) {
                res.end({
                    success: false,
                    message: 'Error: invalid'
                })
                return;
            }

            const user = users[0];

            if (!user.validPassword(password)) {
                res.end({
                    success: false,
                    message: 'Error: invalid'
                })
                return;
            }

            // Otherwise create user sessions
            const UserSession = new UserSessions();
            UserSession.userId = user._id;
            UserSession.save((err, doc) => {
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: server error'
                    })
                    return;
                }

                return res.send({
                    success: true,
                    messages: 'Valid sign in',
                    token: doc._id
                });
            });
        });
    });

    app.get(`/api/account/verify`, (req, res, next) => {
        // Get the token
        // Verify the token is one of a kind and is not deleted
        const { query } = req;
        const { token } = query;

        UserSession.find({
            _id: token,
            isDeleted: false
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server erorr'
                })
            }

            if (sessions.length !== 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                })
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                })
            }
        })
    });

    app.get(`/api/account/logout`, (req, res, next) => {
        const { query } = req;
        const { token } = query;

        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, {
            $set: { isDeleted: true }
        }, null, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: server erorr'
                });
            }
            return res.send({
                success: true,
                message: 'Good'
            });
        });
    });

};