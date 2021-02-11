// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'myproject';

// // Create a new MongoClient
// const client = new MongoClient(url);

// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");

//   const db = client.db(dbName);

//   client.close();
// });



const mongoose = require('mongoose');

// URL: <server>/<Database, if it doesn't exist a new one will be created>
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true, useUnifiedTopology: true });

//Schema
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "What's the name of the fruit?"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

// First Parm: String, singular, name of collection,
// in MongoDB it will be saved all lower case
// Second Parm: Scheme
//mention fruit in singular and mongo will automatically change to fruits

//Model
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 30, //more than max Validation error
    review: "Pretty solid as a fruit."
});
const peaches = new Fruit({
    rating: 10,//no name here validation error
    review: "Peaches are the best!"
});

// fruit.save();
// peaches.save();
// it will save every time you execute this statement


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema //relationsip
});
// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 10,//no name here validation error
//     review: "Yom yom!"
// });
// pineapple.save();
// const watermelon = new Fruit({
//     name: "Watermelon",
//     rating: 8,//no name here validation error
//     review: "Niceeee!"
// });
// watermelon.save();

const Person = mongoose.model("Person", personSchema);
// const person = new Person({
//     name: "Kevin",
//     age: 25,
//     favoriteFruit: pineapple
// });

// const person = new Person({
//     name: "John",
//     age: 37
// });


// person.save();
Person.updateOne({ name: "John" }, { favoriteFruit: watermelon }, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully updated");
    }
});
const banana = new Fruit({
    name: "Banana",
    rating: 6,
    review: "Weird texture."
});
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 4,
    review: "Too sweet for me."
});

const orange = new Fruit({
    name: "Orange",
    rating: 8,
    review: "Tastes great."
});



// documentation mangoose updateone,updatemany

// Person.updateOne({ name: "John" }, { favoriteFruit: orange }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Success");
//     }
// });
// Fruit.updateOne({ _id: "5fed7c0968589a2ff63d8c29" }, { name: "Peach" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully updated");
//     }
// });

// Fruit.deleteOne({ _id: "5fed7c0968589a2ff63d8c29" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted the document");
//     }

// }

// );
// Person.deleteMany({ name: "John" }, function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all the documents");
//     }

// });

// Fruit.insertMany([banana, kiwi, orange], function (err) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully saved all the fruits");
//     }
// });

Fruit.find(function (err, fruits) {
    if (err) {
        console.log(err);
    } else {
        // console.log(fruits);
        //friuits here is an array of objects
        mongoose.connection.close(); // Eventhough the close connection is here it will still log out the fruits list in the next line

        for (var i = 0; i < fruits.length; i++) {
            console.log(fruits[i].name);
        }

        // fruits.forEach(function (fruit) {
        //     console.log(fruit.name);
        // });
    }
});