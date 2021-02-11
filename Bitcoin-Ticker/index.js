const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});
app.post("/", function (req, res) {
    // console.log(req.body.crypto)
    request(' https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD', function (error, response, body) {
        // console.log(response.statusCode);
        console.log(body);
        // console.error('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var data = JSON.parse(body);
        var price = data.averages.week;
        console.log(price);
        res.send('<h1>Your Price is :' + price + "</h1>")
    });
});

app.listen(3000, function () {
    console.log("Server is running");
});

