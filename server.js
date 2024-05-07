import express from 'express';
//const _ = require('lodash');
//import * as lodash from 'lodash';
import lowerCase from 'lodash/lowerCase.js';




console.log(lowerCase("hello-it-works-omg-omg"));
const app= express();
const port = 3000;
const postsArr = [];

const addPost = function(req) {
  // only pushes into array if object is not empty //
  if (Object.keys(req.body).length > 0 ) {
    let idNum = Math.ceil(Math.random() * 50000);
    // adds new key value pair to object //
    Object.assign(req.body, {id: idNum});
    Object.assign(req.body, {deleteId: idNum});
    postsArr.push(req.body);
    
  }
}

const findMatch = function(req) {
  console.log((req.params.postTitle));
  const foundTitle = postsArr.filter(foundPost => lowerCase(foundPost.title) === lowerCase(req.params.postTitle));
  if (foundTitle.length > 0) {
    console.log("match found");
  } else {
    console.log("no match");
  }
}

const editPost = function(req) {
  // getting the id from data sent in post request
  const postId = req.body.id;
  // getting the index of the post in the array that matches the id in the post request 
  let index = postsArr.findIndex((element) => element.id == postId);
  // replacing the element at that index with the object sent in post request 
  postsArr[index] = req.body;
  console.log("tisone", postsArr[index]);
}

const deletePost = function(req) {
  // getting the id from the post request
  const postId = req.body.id;
  // getting the index of the post in the array that matches the id in the post request
  let index = postsArr.findIndex(element => element.id == postId);
  // removes the object from the array
  postsArr.splice(index, 1);
}

// needed to serve static files 
app.use(express.static("public"));
// gives access to req.body object 
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  // sending file and the array to be used to render data in the html(ejs file)
  res.render("index.ejs", { posts: postsArr });
})

app.get("/server-data", (req, res) => {
  // sending array data for my fetch method so i can use the array data in the client side js file  
  res.send({data: postsArr});
})

app.get("/blog-posts", (req, res) => {
  res.render("blog-posts.ejs", {posts: postsArr});
})

app.get("/blog-posts/:postTitle", (req, res) => {
  findMatch(req);
  
  //res.render("blog-posts.ejs", {posts: postsArr});
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.post("/create", (req, res) => {
  addPost(req);
  res.render("blog-posts.ejs", { posts: postsArr });    
})

app.post("/edit", (req, res) => {
  editPost(req);
  res.render("blog-posts.ejs", { posts: postsArr });
})

app.post("/delete", (req, res) => {
  console.log(req.body);
  deletePost(req);
  res.render("blog-posts.ejs", {posts: postsArr});
})



app.get("/play/:game", (req, res) => {
  console.log(req.params.game);
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})