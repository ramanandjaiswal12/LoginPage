const express = require("express")
const app = express()
var cookieParser = require('cookie-parser');
const validator = require("email-validator")
var session = require('express-session');
var mysql = require('mysql2');
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');
const { json } = require("express");
const port = 4001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: '123458cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "database"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});




function sendEmail(email, token) {
    var sent = 0;
    var email = email;
    var token = token;
    var mail = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jaiswalkush90@gmail.com',
            pass: '12345ramanand'
        }
    });
    var mailOptions = {
        from: 'jaiswalkush90@gmail.com',
        to: email,
        subject: 'Reset Password Link',
        html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/update-password?token=' + token + '">link</a> to reset your password</p>'
    };
    mail.sendMail(mailOptions, function (error, info) {
        if (error) {
            sent = 1
            console.log(error)
        } else {
            sent = 0

        }
    });
    return sent
}

app.post("/login", async (req, res) => {
    var isLogin = true
    var error = {};
    const email = req.body.email
    const password = req.body.password

    const validatorPassword = /[a - zA - Z0 - 9]+/

    // if (email == null) {
    //     error["email"] = "email incorrect"
    //     isLogin = false
    // }
    // if (password == null) {
    //     error["password"] = "password incorrect"
    //     isLogin = false
    // }

    if (!(validator.validate(email))) {
        error["email"] = "email incorrect"
        isLogin = false
    }
    if (!(password.length >= 4 && validatorPassword.test(password) && password.length <= 10)) {
        error["password"] = "password weak"
        isLogin = false
    }

    if (isLogin) {
        console.log("_____________________" + email)

        con.query('SELECT * FROM login WHERE email = ?', [email], (err, result) => {
            if (err) {
                return err;
            }
            if (result.length > 0) {
                for (let i of result) {
                    if (i.password === password) {
                        error["login"] = "login Succcess"
                        console.log(error)
                        res.send(error)
                    }
                    else {
                        error["login"] = "login failed"
                        console.log(error)
                        res.send(error)
                    }

                }
            }
            else {
                error["login"] = "Email not Registered"
                console.log(error)
                res.send(error)
            }
        });
    }
    else {
        res.send(error)
    }




})


app.post('/reset-password', function (req, res) {
    var email = req.body.email;
    var msg = {}
    con.query('SELECT * FROM login WHERE email =?', email, function (err, result) {
        if (err) throw err;
        if (result.length > 0) {
            var token = randtoken.generate(20);
            var sentMail = sendEmail(email, token);

            if (sentMail === 0) {
                var data = {
                    token: token
                }
                con.query('UPDATE login SET ? WHERE email ="' + email + '"', data, function (err, result) {
                    if (err) throw err
                })
                msg["msg"] = 'link sent to your email';
                console.log(msg)
                res.send(msg)
            } else {
                msg["msg"] = 'Please try again';
                res.send(msg)
            }
        } else {
            msg["msg"] = 'Email Incorrect';
            res.send(msg)
        }
    });



})
app.post('/update-password', function (req, res) {
    var url = req.body.url
    url = url.split("=")
    var token = url[1]
    var newPassword = req.body.newPassword
    console.log(token)
    console.log(url)
    console.log(newPassword)
    const validatorPassword = /[a - zA - Z0 - 9]+/
    error = {}
    if (!(newPassword.length >= 4 && validatorPassword.test(newPassword) && newPassword.length <= 10)) {
        error["msg"] = "password weak"
        res.send(error)
    }
    else {
        con.query('SELECT * FROM login WHERE token ="' + token + '"', function (err, result) {
            if (err) throw err;
            console.log(token)
            console.log(result)
            if (result.length > 0) {
                con.query('UPDATE login SET password=? WHERE email ="' + result[0].email + '"', newPassword, function (err, result) {
                    if (err) {
                        console.log(err)
                        throw err
                    }
                });


                error["msg"] = "updated successfully"
                res.send(error)

            } else {
                error["msg"] = "Invalid link"
                res.send(error)
            }
        });

    }



})



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})