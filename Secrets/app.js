// jshint esversion:6
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
mongoose.connect('mongodb://127.0.0.1:27017/userDB');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const secret = "HelloHowAreYouDoingInLifeDon'tGiveUp";
userSchema.plugin(encrypt,
    { secret: secret, encryptedFields: ["password"] });
const User = new mongoose.model("User", userSchema);
app.get("/", function (req, res) {
    res.render("home");
})
app.get("/login", function (req, res) {
    res.render("login");
})
app.get("/register", function (req, res) {
    res.render("register");
})

app.post("/register", function (req, res) {
    console.log(req.body.username)
    const newUser = new User({
        email: req.body.username,
        password: req.body.password

    })
    newUser.save().then(savedUser => {
        if (savedUser === newUser) {
            res.render("secrets");
        }
        else {
            console.log("You are not registered as a user.")
        }
    });
})

app.post("/login", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ email: username }).then(foundUser => {
        console.log(foundUser)
        if (foundUser.password === password) {
            res.render("secrets");
        }

        else {
            console.log("user not registered")
        }

    })
})
app.listen(3000, function () {
    console.log("Server started on port 3000.")
});