//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect('mongodb://127.0.0.1:27017/myBlog');

const BlogSchema = new mongoose.Schema({
  title: String,
  body: String
});
const BlogsSchema = new mongoose.Schema({
  _id: Number,
  home: String,
  aboutUs: String,
  contactUs: String,
  blogs: [BlogSchema]
})


let posts = [];
const blogModel = mongoose.model('post', BlogSchema);
const blogsModel = mongoose.model('content', BlogsSchema);


app.get("/", async function (req, res) {

  const blogsCollection = await blogsModel.find({});
  console.log(blogsCollection);
  if (blogsCollection.length == 0) {
    const content = new blogsModel({
      _id: 1,
      home: homeStartingContent,
      aboutUs: aboutContent,
      contactUs: contactContent
    })
    content.save();
    res.redirect("/");
  }
  else {

    res.render("home", {
      startingContent: blogsCollection[0].home,
      posts: blogsCollection[0].blogs
    });

  }

}



);

app.get("/about", async function (req, res) {
  const blogsCollection = await blogsModel.find({});
  res.render("about", { aboutContent: blogsCollection[0].aboutUs });
});

app.get("/contact", async function (req, res) {
  const blogsCollection = await blogsModel.find({});
  res.render("contact", { contactContent: blogsCollection[0].contactUs });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", async function (req, res) {
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;
  const blogsCollection = await blogsModel.find({ __id: 1 });

  console.log(postTitle);
  if (postTitle || postBody) {
    const post = new blogModel({
      title: postTitle,
      body: postBody
    })
    post.save();
    const blogsCollection = await blogsModel.findOne({ _id: 1 });

    blogsCollection.blogs.push(post);
    blogsCollection.save();

  }

  res.redirect("/");

});

app.get("/posts/:postId", async function (req, res) {
  const requestedId = _.lowerCase(req.params.postId);
  const blogsCollection = await blogsModel.findOne({ _id: 1 });
  blogsCollection.blogs.forEach(function (post) {
    const storedId = _.lowerCase(post._id);

    if (storedId === requestedId) {
      res.render("post", {
        title: post.title,
        body: post.body
      });
    }
  });

});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
