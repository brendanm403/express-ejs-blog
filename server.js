import express from 'express';

const app= express();
const port = 3000;
const postsArr = [];

const addPost = function(req) {
  // only pushes into array if object is not empty //
  if (Object.keys(req.body).length > 0 ) {
    Object.assign(req.body, {id: Math.ceil(Math.random() * 50000)})
    postsArr.push(req.body);
    console.log(postsArr);
  }
}

const editPost = function(req) {

}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.render("index.ejs", { posts: postsArr });
})

app.get("/blog-posts", (req, res) => {
  res.render("blog-posts.ejs");
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
  res.render("blog-posts.ejs", { posts: postsArr });
})



app.listen(port, () => {
  console.log(`server running on port ${port}`);
})