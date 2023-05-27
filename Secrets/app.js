// jshint esversion:6
require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const facebookStrategy = require('passport-facebook');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "This is my secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb://127.0.0.1:27017/userDB');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    secret: String

});
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
})

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.googleId || user.id);
});

passport.deserializeUser(async function (id, done) {
    try {

        const user = await User.find({ googleId: id });
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});



passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    function (accessToken, refreshToken, profile, cb) {

        User.findOrCreate({ googleId: profile.id, username: profile.displayName }, function (err, user) {
            return cb(err, user);
        });
    }
));

// passport.use(new facebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3000/oauth2/redirect/facebook",
//     // userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// },
//     function (accessToken, refreshToken, profile, cb) {
//         console.log(profile)
//         User.findOrCreate({ facebookId: profile.id, username: profile.displayName }, function (err, user) {
//             return cb(err, user);
//         });
//     }
// ));

app.get("/", function (req, res) {
    res.render("home");
})
app.get("/login", function (req, res) {
    res.render("login");
})
app.get("/register", function (req, res) {

    res.render("register");
})
app.get("/secrets", async function (req, res) {

    const users = await User.find({ "secret": { $ne: null } }).exec();
    console.log(users)
    if (users) {
        res.render("secrets", { usersWithSecrets: users })
    }



})
app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    }
    else {
        res.redirect("/login");
    }
})

app.post("/submit", async function (req, res) {
    const submittedSecret = req.body.secret;
    const foundUser = await User.findOne({ googleId: req.id });

    if (foundUser) {

        foundUser.secret = submittedSecret;
        foundUser.save().then(savedDoc => {

            res.redirect("/secrets");

        });
    }

})
app.post("/register", function (req, res) {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {

        if (err) {
            console.log(err);
            res.redirect("/register");
        }
        else {

            passport.authenticate("local")(req, res, function () {

                res.redirect("/secrets")
            })

        }
    });

})
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));
app.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (!err) {
            res.redirect("/",);
        }
    });

})
// app.get('/auth/facebook',
//     passport.authenticate('facebook', { scope: ['profile'] }));
app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password

    })
    req.login(user, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/secrets");
            })
        }
    })
})

app.get('/auth/google/secrets',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/secrets');
    });
// app.get('/auth/facebook/secrets',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/secrets');
//     });
app.listen(3000, function () {
    console.log("Server started on port 3000.")
});