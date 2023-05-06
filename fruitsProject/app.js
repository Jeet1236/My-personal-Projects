// getting-started.js
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/peopleDB', { useNewUrlParser: true });


const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Your name is required here"]
    },
    age: Number,
    location: String
})
const People = mongoose.model("People", peopleSchema);
const people = new People({
    age: 20,
    location: "Ontario"
});

const people2 = new People({
    name: "Vedant",
    age: 19,
    location: "Ontario"
});
// Updating the entry
People.updateOne({ _id: "63c716ad55453f9dc73aecd3" }, { age: 23 }, function (err, output) {
    if (err) {
        console.log("Not able to update");
    }
    else {
        console.log("Updated successfully")
    }
});

// deleting the entry
People.deleteOne({ _id: "63c716ad55453f9dc73aecd4" }, function (err, success) {
    if (err) {
        console.log("There was error deleting the entry")
    }
    else {
        console.log("The entry was successfully deleted")
    }
})
const people3 = new People({
    name: "Vinit",
    age: 19,
    location: "Ontario"
});

People.insertMany([people, people2, people3], function (err) {
    if (err) {
        console.log("err");
    }
    else {
        console.log("You have successfully inserted the data");
    }
})

People.find(function (err, peoples) {
    if (err) {
        console.log("An error has been detected")
    }
    else {
        peoples.forEach((element) => { console.log(element.name) });
        mongoose.connection.close()
    }

})
