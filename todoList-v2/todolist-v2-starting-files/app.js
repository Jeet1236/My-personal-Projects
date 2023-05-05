//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const app = express();
const _ = require("lodash");
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://bharatipatel105:Jeet12h%40@cluster0.sgobcms.mongodb.net/todolistDB");
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = ["New work today"];

const todoSchema = new mongoose.Schema({
  name: String
});
const ItemModel = mongoose.model("Item", todoSchema);

const item1 = new ItemModel({
  name: "Welcome to your todoList!"
})
const item2 = new ItemModel({
  name: "Hit the + button to add a new item."
})
const item3 = new ItemModel({
  name: "<-- Hit this to delete an item."
})
const listSchema = mongoose.Schema({
  name: String,
  items: [todoSchema]
})
const List = mongoose.model("List", listSchema);



app.get("/", async function (req, res) {

  const day = date.getDate();

  const obtainedItems = await ItemModel.find({});
  if (obtainedItems.length === 0) {

    ItemModel.insertMany([item1, item2, item3]);
    res.redirect("/")
  }
  else {

    res.render("list", { listTitle: day, newListItems: obtainedItems });
  }
}

);




app.post("/", async function (req, res) {

  const item = req.body.newItem;
  const listName = req.body.list;
  const newItem = new ItemModel({
    name: item
  });
  if (listName === "Today") {
    newItem.save();
    res.redirect("/");
  }
  else {
    const obtainedListName = await List.findOne({
      name: listName
    });
    if (obtainedListName) {
      obtainedListName.items.push(newItem);
      obtainedListName.save();
      res.redirect("/" + listName);
    }
  }
});
app.post("/delete", async function (req, res) {
  const itemId = req.body.checkbox;
  const listName = req.body.listName;
  if (listName === "Today") {
    await ItemModel.deleteOne({
      _id: itemId
    });
    res.redirect("/");
  }

  else {

    const x = await List.findOneAndUpdate({ name: listName }, { $pull: { items: { _id: itemId } } }, { new: true });
    console.log(x)
    if (x) {
      res.redirect("/" + listName);
    }
  }

})
app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/:customListName", async (req, res) => {
  const customListName = _.capitalize(req.params.customListName);
  const listData = await List.findOne({ name: customListName });
  console.log(listData);
  if (!listData) {
    const list = new List({
      name: customListName,
      items: [item1, item2, item3]
    })
    await list.save();
    res.redirect(customListName)
  }
  else {
    res.render("list", { listTitle: listData.name, newListItems: listData.items });
  }


})
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
