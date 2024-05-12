import express from 'express';
//const _ = require('lodash');
//import * as lodash from 'lodash';
import lowerCase from 'lodash/lowerCase.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../blog-project/public/uploads')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + file.originalname);
  }
})

const upload = multer({ storage: storage});
const app= express();
const port = 3000;
const postsArr = [];



const addPost = function(req) {
  // only pushes into array if object is not empty //
  if (Object.keys(req.body).length > 0 ) {
    let idNum = Math.ceil(Math.random() * 50000);
    // getting date and time to add to object
    let date = new Date;
    let dateString = date.toDateString();
    // adds new key value pair to object //
    Object.assign(req.body, { id: idNum });
    Object.assign(req.body, { deleteId: idNum });
    Object.assign(req.body, { date: dateString.substring(4, dateString.length)});
    Object.assign(req.body, { time: date.toLocaleTimeString()});
    postsArr.push(req.body);
    
  }
}

const findMatch = function(req, res) {
  console.log((req.params.postTitle));
  const foundTitle = postsArr.filter(foundPost => lowerCase(foundPost.title) === lowerCase(req.params.postTitle));
  if (foundTitle.length > 0) {
    console.log("match found");
    res.render("post.ejs", {post: foundTitle});
  } else {
    console.log("no match");
    res.render("post.ejs", {post: foundTitle});
  }
}

const editPost = function(req) {
  // adding date and time to object
  let date = new Date;
  let dateString = date.toDateString();
  Object.assign(req.body, { date: dateString.substring(4, dateString.length)});
  Object.assign(req.body, { time: date.toLocaleTimeString()});
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

app.get("/server-data", (req, res) => {
  // sending array data for my fetch method so i can use the array data in the client side js file  
  res.send({data: postsArr});
})

app.get("/", (req, res) => {
  // sending file and the array to be used to render data in the html(ejs file)
  res.render("index.ejs", { posts: postsArr });
})

app.get("/blog-posts/:postTitle", (req, res) => {
  // I put the res.render in the findmatch function unlike all the other routes 
  findMatch(req, res);
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
})

app.get("/about", (req, res) => {
  res.render("about.ejs");
})

app.post("/create", (req, res) => {
  addPost(req);
  res.redirect("/");    
})

app.post("/profile", upload.single('avatar'), (req, res) => {
  console.log(req.file);
  const reqPath = req.file.path;
  const alteredPath = req.file.path.substring(22, reqPath.length);
  res.render("index.ejs", {posts: postsArr, imgSrc: alteredPath});
})

app.post("/edit", (req, res) => {
  editPost(req);
  res.redirect("/");
})

app.post("/delete", (req, res) => {
  console.log(req.body);
  deletePost(req);
  res.redirect("/");
})

app.get("/play/:game", (req, res) => {
  console.log(req.params.game);
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})