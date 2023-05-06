//jshint esversion: 6
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.listen(3000, function () {
    console.log("Server is running on port 3000");
})
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signUp.html");

})
app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;
    console.log(firstName);
    console.log(lastName);
})

// 16c48312d2061a15660a7117351f80ae-us21