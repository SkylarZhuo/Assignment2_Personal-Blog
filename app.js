//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const date = require(__dirname + "/date.js");
const homeStartingContent =
  "Add some new blogs to record anything you want➡   ";

const app = express();
const { check, validationResult } = require("express-validator");
//Express router
// const postsRouter = require('./routes/posts');
// app.use('/posts',postsRouter);

//Connect to MongoDB-->Local Database
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

//Connect to MongoDB-->MongoDB Atlas

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());

//Express router
app.use(require("./routes/posts"));

const Post = require("./models/postModel");
//Mongoose Document--Default Blogs shown on home page
const blog1 = new Post({
  title: "What I learn today -- EJS Template",
  content:
    " EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.",
});

const blog2 = new Post({
  title: "What is a Web App?",
  content:
    "A web application is software developed with a specific set of technologies, and it works over the internet. It is an application you use on your mobile, tablet, desktop, or laptop without downloading anything. " +
    "How can web apps get more powerful? The kinds of work that you can do on a webpage has evolved significantly in the past decade. As our computers get faster, and browsers optimize JavaScript performance, we’ve gone from reading email and writing text documents to doing graphic design and making music." +
    "But native apps have the advantage of compiled, close-to-the-metal code. If you write your app in Java for Android or Swift for iOS, you can easily outstrip nearly any JavaScript-based app in performance. If you write parts of your app using C or C++, as many game developers do, for instance, you can often go even faster.",
});

const defaultBlogs = [blog1, blog2];

app.get("/", function (req, res) {
  const day = date.getDate();
  Post.find({}, function (err, foundItems) {
    if (foundItems.length === 0) {
      Post.insertMany(defaultBlogs, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully add to the database");
        }
      });
      res.redirect("/");
    } else {
      res.render("home", {
        Today: day,
        startingContent: homeStartingContent,
        posts: foundItems,
      });
    }
  });
});

// app.get("/about",function(req,res){
//   res.render("about");
// })

// app.get("/contact",function(req,res){
//   res.render("contact");
// })

// app.get("/compose",function(req,res){
//   res.render("compose");
// });

//add data validation when adding new post
// app.post("/compose",function(req,res){

//   const post = new Post({
//     title:req.body.postTitle,
//     content:req.body.postBody
//   });
//   post.save(function(err){
//     if(!err){
//       res.redirect("/");
//     }
//   });
// })

// app.get("/posts/:postId",function(req,res){
//   // const requestedTitle = _.lowerCase(req.params.postName);
//   const requestedPostId = req.params.postId;
//   Post.findOne({_id: requestedPostId}, function(err, post){
//     res.render("post", {
//       title: post.title,
//       content: post.content
//     });
//   });
// });

// app.post("/delete", function (req, res) {

//   // const postId = req.params.postId;
//   const postId = req.body.postId;
//   Post.findByIdAndRemove(postId, function (err) {
//     if (!err) {
//       res.redirect("/");
//     } else {
//       console.log(err);
//     }
//   });
// });

// postsRouter.get("/",function(req,res){
//   res.send("<h1>the posts</h1>");
// })

//===================== Error Handler =======================
app.get("/404", function (req, res, next) {
  next();
});

app.get("/403", function (req, res, next) {
  // trigger a 403 error
  var err = new Error("not allowed!");
  err.status = 403;
  next(err);
});

app.get("/500", function (req, res, next) {
  // trigger a generic (500) error
  next(new Error("keyboard cat!"));
});

app.use(function (req, res, next) {
  res.status(404);

  res.format({
    html: function () {
      res.render("404", { url: req.url });
    },
    json: function () {
      res.json({ error: "Not found" });
    },
    default: function () {
      res.type("txt").send("Not found");
    },
  });
});

app.use(function (err, req, res, next) {
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render("500", { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The app is running on port ${PORT}`);
});
