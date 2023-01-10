const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var input = [];
let works = [];

app.get("/", function (req, res) {
    res.render("list", { listTitle: date.getDate(), toDoList: input });

})
app.post("/", function (req, res) {

    if (req.body.list === "Work") {
        works[works.length] = req.body.input;
        res.redirect("/work");
    }
    else {
        input[input.length] = req.body.input;
        res.redirect("/");
    }

})

app.get("/work", function (req, res) {

    res.render("list", { listTitle: "Work List", toDoList: works })
})

app.get("/about", function (req, res) {
    res.render("about");

})

app.listen(3000, function () {
    console.log("You are connected to the port 3000");
})