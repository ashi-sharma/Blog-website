//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const app = express();

app.set('view engine', 'ejs');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/blogsDB", {useNewUrlParser: true});


const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Blog = mongoose.model("Blog", blogSchema);

const blog1 = new Blog({
  title: "Blog1",
  content: "I am blog 1 :)"
});

const blog2 = new Blog({
  title: "Blog2",
  content: "I am blog 2 :)"
});

const blog3 = new Blog({
  title: "Blog3",
  content: "I am blog 3 :)"
});

const defaultBlogs = [blog1, blog2, blog3];



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{
    p1: homeStartingContent,
  });
});

app.get("/about",function(req,res){
  res.render("about", {p2:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{
    p3:contactContent
  });
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/blogs",function(req,res){
  Blog.find({}, function(err, foundBlogs){
    if(foundBlogs.length===0){
      Blog.insertMany(defaultBlogs, function(err){
        console.log("default blogs inserted into db");
        res.redirect("/blogs");
      });
    }
    else{
      res.render("blogs",{posts: foundBlogs}); 
    }
  });
});

app.get("/posts/:postName",function(req,res){
  Blog.findOne({title: req.params.postName}, function(err, foundBlog){
    if(err){
      console.log(err);
    }
    else{
      res.render("post", {
        title: foundBlog.title,
        blog: foundBlog.content
      });
    }
  });
});

app.post("/compose",function(req,res){
  const blogn = new Blog({
    title: req.body.blogtitle,
    content: req.body.blogpost
  });
  blogn.save();
  res.redirect("/blogs");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
