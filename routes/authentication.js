const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

// /login router
router.post('/login', (req, res) => {
    const loginEmail = req.body.email;
    const loginPwd = req.body.password;
    // Database query
    req.db.from('users')
        .where({ email: loginEmail })
        .select('password')
        .then(function (result) {
            var pass = result[0].password;
            if (loginPwd === pass) {
                /**
                 * if the credentials are correct, then give out
                 * an access token with basic encryption as well
                 * as its expiry duration
                 */
                const token = jwt.sign(
                    { email: loginEmail, password: loginPwd }, 
                      'what is blue and not heavy', 
                      { expiresIn: "86400s" }
                    );
                res.status(200).json({
                    token: token,
                    access_token: token,
                    token_type: "Bearer",
                    expires_in: 86400
                });
            } else {
                // 401 Error handling
                res.status(401).json({
                    message: 'Invalid login - bad password'
                });
            }

        })
        .catch(function (error) {
            // 401 Error handling
            res.status(401).json({
                message: "Invalid login - Email doesn't Exist"
            });
            console.log(error);
        })
})

// /register router
router.post('/register', (req, res) => {
    let regEmail = req.body.email;
    let regPwd = req.body.password;
    req.db
        .from('users')
        .insert({
            email: regEmail,
            password: regPwd,
        })
        // Display different message based on the status
        .then(() => {
            res.status(201).json({ message: "yay! you've successfully registered your user account :)" })
        })
        .catch(() => {
            res.status(400).json({ message: "oops! It looks like that user already exists :(" })
        })
})

/**
 * Export the access token so that it can be used in
 * multiple files.
 */
exports.accessToken = function (req, res, next) {
    const bearerHead = req.headers['authorization'];
    if (typeof bearerHead != 'undefined') {
        const bearer = bearerHead.split('');
        const bToken = bearer[1];
        req.token = bToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

module.exports = router;  