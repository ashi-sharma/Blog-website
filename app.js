//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const contactContent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let postContent = [];

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
  res.render("blogs",{
    posts: postContent
  });
});

app.get("/posts/:postName",function(req,res){
  const searchedBlog = lodash.lowerCase(req.params.postName);
  postContent.forEach(function(post){
    const title = lodash.lowerCase(post.blogtitle);
    if(title===searchedBlog){
      res.render("post",{
        title:post.blogtitle,
        blog:post.blogPost
      });
    }
  });
});

app.post("/compose",function(req,res){
  var post={
    blogtitle:req.body.blogtitle,
    blogPost:req.body.blogpost
  };
  postContent.push(post);
  res.redirect("/blogs");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
