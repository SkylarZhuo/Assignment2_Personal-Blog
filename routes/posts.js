const express = require("express");
const router = express.Router();
const Post = require("../models/postModel");

router.get("/posts/:postId", function (req, res) {
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;
  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      title: post.title,
      content: post.content,
    });
  });
});

router.get("/about", function (req, res) {
  res.render("about");
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

router.get("/compose", function (req, res) {
  res.render("compose");
});

router.post("/compose", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
  });
  post.save(function (err) {
    if (!err) {
      res.redirect("/");
    }
  });
});

router.post("/delete", function (req, res) {
  // const postId = req.params.postId;
  const postId = req.body.postId;
  Post.findByIdAndRemove(postId, function (err) {
    if (!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
