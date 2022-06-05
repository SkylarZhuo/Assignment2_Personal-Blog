//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');


// let posts= [];
const date = require(__dirname+"/date.js");
const homeStartingContent = "Add some new blogs to record anything you want!   ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
//Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


//Create new postSchema
const postSchema={
  title:String,
  content:String
}

//create new mongoose model
const Post = mongoose.model("Post",postSchema);

//Mongoose Document--Default Blogs shown on home page
const blog1 = new Post({
  title:"What I learn today -- EJS Template",
  content:" EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript."
});

const blog2 = new Post({
  title:"What is a Web App?",
  content:"A web application is software developed with a specific set of technologies, and it works over the internet. It is an application you use on your mobile, tablet, desktop, or laptop without downloading anything. "
  
});

const defaultBlogs = [blog1,blog2];

app.get("/",function(req,res){
  const day = date.getDate();
  Post.find({},function(err,foundItems){
    if(foundItems.length === 0){
      Post.insertMany(defaultBlogs,function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log("Successfully add to the database");
        }
      });
      res.redirect("/");
    }
    else{
      res.render("home",{
        Today:day,
        startingContent:homeStartingContent,
        posts:foundItems
      })
    }
  })

  // res.render("home",{
  //   Today: day,
  //   startingContent:homeStartingContent,
  //   posts:foundItems
  // });
})


app.get("/about",function(req,res){
  res.render("about",{
    aboutContent:aboutContent
  });
})

app.get("/contact",function(req,res){
  res.render("contact",{
    contactContent:contactContent
  });
})

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
})

app.get("/posts/:postId",function(req,res){
  // const requestedTitle = _.lowerCase(req.params.postName);
  const requestedPostId = req.params.postId;

  // posts.forEach(function(post){
  //   const storedTitle = _.lowerCase(post.title);
  //   if(storedTitle === requestedTitle){
  //     res.render("post",{
  //       title: post.title,
  //       content: post.content
  //     });
  //   }
  // });
  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
