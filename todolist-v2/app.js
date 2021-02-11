//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");
const { capitalize } = require("lodash");
// const date = require(__dirname + "/date.js");
//date module is deleted

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true });

//Items and work items array has been removed and the storing part is done with mongodb
// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

//Schema
const itemsSchema = {
  name: String
};

//Model
const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your Todo-list!"
});
const item2 = new Item({
  name: "Hit + button to add a new item"
});
const item3 = new Item({
  name: "<---Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

const listSchema = {
  name: String,
  items: [itemsSchema]
}
const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {

  Item.find({}, function (err, foundItems) {
    //Here founItems is an array
    //The find method will work even if empty brackets was not written

    if (foundItems.length === 0) {
      // checking whether the items are empty

      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully inserted");
        }
      });
      res.redirect("/");
    }
    else {

      // console.log(foundItems);
      res.render("list", { listTitle: "Today", newListItems: foundItems });
    }
    // if (err) {
    //   console.log(err);
    // } else {
    //   for (var i = 0; i < fruits.length; i++) {
    //     console.log(fruits[i].name);
    //   }
    // }
  });
  // const day = date.getDate();



});

app.post("/", function (req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });
  if (listName === "Today") {
    item.save();
    res.redirect("/");
  }
  else {
    List.findOne({ name: listName }, function (err, foundList) {
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName);
    });
  }



  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});
app.post("/delete", function (req, res) {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {

    Item.findByIdAndRemove(checkedItemId, function (err) {
      // Here callback function is a must orelese it will just find the id and return.(from mongoose doc)
      if (err) {
        console.log(err);
      } else {
        console.log("Sucessfully deleted the item");
      }
    });
    res.redirect("/");
  }
  else {
    List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: checkedItemId } } }, function (err, foundList) {
      if (!err) {
        res.redirect("/" + listName);
      }
    })
  }


});
app.get("/:customListName", function (req, res) {
  const customListName = _.capitalize(req.params.customListName);

  // This part is on route parameters eg: locaalhost:3000/customListName (We sre trying to create different page based on above example )

  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //this can also be foundlist.name=== lists that are present (which cannot be accessed)
        //findone function searches for one item only(remember)
        // console.log("Doesn't exist!");
        // console.log(foundList);
        //Here foundlist is an object 

        //create a new list

        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);

      }
      else {
        //show an existing list
        // console.log("Exists!");
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items })
        // console.log(foundList);
      }
    }

  });
});
// app.get("/work", function (req, res) {
//   res.render("list", { listTitle: "Work List", newListItems: workItems });
// });

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
