const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); //below app always
// let item = "";
const items = ["Buy food", "Cook food", "Eat food"];
//Eventhough we push into a array it cannot be assigned with new array( This is a special functionality of js)
//we can change a array/object item as well in js with const var
//read doc if needed

const workItems = [];
app.use(express.static("public"));

app.get("/", function (req, res) {

    // let today = new Date();
    // var d = ["Sunday", "Monday", "Tuesday", "Friday", "Saturday"];
    // var currentDay = today.getDay();
    //getDay and getDate is different

    // let day = "";
    //other option for getting day

    // let options = {
    //     weekday: "long",
    //     day: "numeric",
    //     month: "long"
    // };
    // let day = today.toLocaleDateString("en-US", options);
    // if (currentDay === 6 || currentDay === 0) {
    //     day = d[currentDay];
    //     // console.log(day);

    // }
    // //from documentation
    // res.sendFile(__dirname + "/weekend.html");
    // else {
    //     day = d[currentDay];
    // console.log(day);

    // res.write("<p>Boo ! I have a working day<p>");
    // res.write("<h1>I am send</h1>");
    // res.send();
    //sendFile(__dirname + "/weekday.html");
    // }
    //activating function with parenthesis
    const day = date.getDate();
    //Here list is the ejs file
    res.render("list", {
        listTitle: day,
        //most of the time it will be day:day
        newListItems: items
    });
});

app.post("/", function (req, res) {
    const item = req.body.nextItem;
    console.log(req.body.list);
    if (req.body.list === "Work") {
        workItems.push(item);
        console.log(workItems);
        res.redirect("/work");
    } else {

        items.push(item);
        res.redirect("/");
    }

    // console.log(item);
    // Here you add the nextitem to item variable,when you post it redirects u to home route (get) and then sees render and does the process
});
app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});
// app.post("/work", function (req, res) {
//     let item = req.body.nextItem;
//     workItems.push(item);
//     console.log(req.body);
//     res.redirect("/work");
// });

app.get("/about", function (req, res) {
    res.render("about");
})
app.listen("3000", function () {
    console.log("Server is running on port 3000")
});