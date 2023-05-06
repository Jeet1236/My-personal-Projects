//jshint esversion:6
const express = require("express");

const app = express();
app.get("/", function (req, res) {
    res.send("Hi there");
});
app.get("/contact", function (req, res) {
    res.send("This is your amazing contact page and how are you doing?")
})
app.get("/hobbies", function (req, res) {
    res.send("What is your hobby?")
})
app.listen(81, function () {
    console.log("server started on 81");
});