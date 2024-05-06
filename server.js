import express from 'express';

const app= express();
const port = 3000;
const postsArr = [];

const addPost = function(req) {
  // only pushes into array if object is not empty //
  if (Object.keys(req.body).length > 0 ) {
    let idNum = Math.ceil(Math.random() * 50000);
    Object.assign(req.body, {id: idNum});
    Object.assign(req.body, {deleteId: idNum});
    postsArr.push(req.body);
    
  }
}

const editPost = function(req) {
  const postId = req.body.id;
  //const post = postsArr.filter((foundPost) => foundPost.id == postId);
  //console.log("original post found with filter", post);
  //console.log("the entire postsArr", postsArr);
  console.log("index of", postsArr.findIndex((element) => element.id == postId));
  let index = postsArr.findIndex((element) => element.id == postId);
  postsArr[index] = req.body;
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { posts: postsArr });
})

app.get("/server-data", (req, res) => {
  res.send({data: postsArr});
})

app.get("/blog-posts", (req, res) => {
  res.render("blog-posts.ejs", {posts: postsArr});
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
  console.log("new data to update with", req.body);
  editPost(req);
  res.render("blog-posts.ejs", { posts: postsArr });
})

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})