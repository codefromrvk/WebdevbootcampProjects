const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    console.log(__dirname);
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    // console.log(req.body)
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var sum = num1 + num2;
    res.send("Result : " + sum);
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});
app.get("/bmiCalculator", function (req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});
app.post("/bmiCalculator", function (req, res) {
    // console.log(req.body)
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    var bmi = Math.round(weight / Math.pow(height, 2));

    console.log(bmi)
    res.send("Result : " + bmi);
});