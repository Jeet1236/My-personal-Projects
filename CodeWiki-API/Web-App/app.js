//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

mongoose.connect('mongodb://127.0.0.1:27017/WikiDB');
//TODO

WikiDBSchema = new mongoose.Schema({
    title: String,
    content: String
}, { collection: "Articles" })

WikiModel = mongoose.model("Articles", WikiDBSchema);
// WikiModel.insertMany([
//     {
//         "_id": "5c18e1892998bdb3b3d355bf",
//         "title": "REST",
//         "content": "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
//     },
//     {
//         "_id": "5c139771d79ac8eac11e754a",
//         "title": "API",
//         "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
//     },
//     {
//         "_id": "5c1398aad79ac8eac11e7561",
//         "title": "Bootstrap",
//         "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
//     },
//     {
//         "_id": "5c1398ecd79ac8eac11e7567",
//         "title": "DOM",
//         "content": "The Document Object Model is like an API for interacting with our HTML"
//     },
//     {
//         "_id": "5c18f35cde40ab6cc551cd60",
//         "title": "Jack Bauer",
//         "content": "Jack Bauer once stepped into quicksand. The quicksand couldn't escape and nearly drowned.",
//         "__v": 0
//     },
//     {
//         "_id": "6456f65a3ed4163c9820a101",
//         "title": "jeet\n",
//         "content": "I am constantly learning from every direction. I have hunger for learning constantly.",
//         "__v": 0
//     }
// ]);

// chained routing in express
// requesting targeting all the articles
app.route("/articles")

    .get(async function (req, res) {
        const articles = await WikiModel.find({});
        res.send(articles);
    })

    .post(async function (req, res) {
        const title = req.body.title;
        const content = req.body.content;
        const wikiDoc = new WikiModel({
            title: title,
            content: content
        });
        wikiDoc.save();

    })

    .delete(async function (req, res) {
        await WikiModel.deleteMany({});
    });

// request targeting specififc routes
app.route("/articles/:title").get(async function (req, res) {
    const requestedArticle = await WikiModel.findOne({ title: req.params.title });
    if (requestedArticle) {
        res.send(requestedArticle);
    }
    else {
        res.send("No article was found matching the requesting article")
    }

}).put(async function (req, res) {
    console.log(req.body)
    const doc = await WikiModel.findOne({ title: req.params.title });
    if (doc) {

        doc.title = req.body.title;
        doc.content = req.body.content;
        await doc.save();
        console.log(doc);
        res.send(doc);

    }
    else {
        res.send("No such article exist")
    }
}).patch(async function (req, res) {
    console.log(req.body);
    const updateModel = await WikiModel.updateOne({ title: req.params.title }, { $set: req.body });
    console.log(updateModel)
    if (updateModel.modifiedCount === 1) {
        const updatedDoc = await WikiModel.findOne({ title: req.body.title });
        res.send(updatedDoc);
    }
    else {
        res.send(
            "Not able to update"
        )
    }


}).delete(async function (req, res) {

    const deleteItem = await WikiModel.deleteOne({ title: req.params.title });

    if (deleteItem.modifiedCount === 1) {
        res.send("able to delete")
    }
    else {
        res.send("not able to delete")
    }



});
app.listen(3000, async function () {
    console.log("Server started on port 3000");
});