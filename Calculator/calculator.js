const express2 = require("express");
const app = express2();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.listen("3000", function () {
    console.log("You are connected to port 3000")
})
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function (req, res) {
    var num1 = req.body.name1;
    var num2 = req.body.name2;

    var result = num1 + num2;

    res.send(`${result}`);
})


app.get("/bmiCalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");

})

app.post("/bmiCalculator", function (req, res) {
    var mass = parseFloat(req.body.mass);
    var height = parseFloat(req.body.height);

    var bmi = mass / (height * height);

    res.send("Your BMI is " + bmi);
})

