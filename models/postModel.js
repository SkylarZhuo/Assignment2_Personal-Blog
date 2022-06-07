//Require Mongoose
const mongoose = require('mongoose');

//Define a schema
const {Schema} = mongoose;
mongoose.Promise = global.Promise;

const postSchema=new Schema({
  title:{
    type:String,
    required:[true,"Please enter the title of the blog!"
  ]},
  content:{
    type:String,
    required:[true,"Please enter the content of the blog!"
  ]}
  });
  
//create new mongoose model
//const Post = mongoose.model("Post",postSchema);

//Export function to create "SomeModel" model class
module.exports = mongoose.models.Post || mongoose.model("Post",postSchema);