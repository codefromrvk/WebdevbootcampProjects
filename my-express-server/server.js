//jshint esversion:6
const express = require("express");
const app = express();
app.get("/", function (request, response) {
    // console.log(request);
    response.send("<h1>Hello</h1>");// sending the data to the browser ;  usually from server but here our computer itself acts as server
});
app.get("/contact", function (req, res) {
    res.send("Contact me at rvk@gmgail.com");
});
app.get("/about", function (req, res) {
    res.send("<h1>R VARSHITH KUMAR</h1><br/><h2>NMAMIT,NITTE</h2>");
});
app.get("/hobbies", function (req, res) {
    res.send("<ul><li>Chess</li><li>Code</li></ul>");
});
console.log();
app.listen(3000, function () {
    console.log("Server Started on port 3000");
});
