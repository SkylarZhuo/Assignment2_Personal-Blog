//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require('mongoose');


const date = require(__dirname+"/date.js");
const homeStartingContent = "Add some new blogs to record anything you want➡   ";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//Express router
const postsRouter = require('./routes/posts');
app.use('/posts',postsRouter);

//Connect to MongoDB-->Local Database
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

//Connect to MongoDB-->MongoDB Atlas


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.use(express.json());

//Express router
// app.use(express.json());
// const postsRouter = require('./routes/posts');
// app.use('/posts',postsRouter);


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

const {check, validationResult} = require("express-validator");

//add data validation when adding new post
app.post("/compose",function(req,res){[
  check('title','title is required').isEmpty(),
  check('content','content is required').isEmpty()],
  (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(404).json({errors:errors.array()});
    }
  }
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


postsRouter.get("/",function(req,res){
  res.send("<h1>the posts</h1>");
})

//Delete One
// Post.deleteOne({title:""},function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("successfully delete this document");
//   }
// })


//Delete Many
// Post.deleteMany({title:""},function(err){
//   if(err){
//     console.log(err);
//   }
//   else{
//     console.log("successfully delete all the document");
//   }

// })

//===================== Error Handler =======================
app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});

app.get('/403', function(req, res, next){
  // trigger a 403 error
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

app.get('/500', function(req, res, next){
  // trigger a generic (500) error
  next(new Error('keyboard cat!'));
});

// Error handlers

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.

// $ curl http://localhost:3000/notfound
// $ curl http://localhost:3000/notfound -H "Accept: application/json"
// $ curl http://localhost:3000/notfound -H "Accept: text/plain"

app.use(function(req, res, next){
  res.status(404);

  res.format({
    html: function () {
      res.render('404', { url: req.url })
    },
    json: function () {
      res.json({ error: 'Not found' })
    },
    default: function () {
      res.type('txt').send('Not found')
    }
  })
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.

// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.

app.use(function(err, req, res, next){
  // we may use properties of the error object
  // here and next(err) appropriately, or if
  // we possibly recovered from the error, simply next().
  res.status(err.status || 500);
  res.render('500', { error: err });
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port 3000");
});
