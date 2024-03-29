const router = require("express").Router();
let Post = require("../models/post.model");
let Comment = require("../models/comment.model");

 getPostWithComments = async (posts) => {
  const commentCounts = await Promise.all(
    posts.map((post) => {
      return Comment.countDocuments({ post: post._id });
    })
  );

  const postsWithCommentCount = posts.map((post, index) => {
    return {
      ...post.toObject(),
      commentCount: commentCounts[index] || 0,
    };
  });
  return postsWithCommentCount

}

router.route("/").get(async (req, res) => {
  const word = req.query.search
  const query = { $or: [ { heading: { $regex: word, $options: "i" } }, { content: { $regex: word, $options: "i" } } ] };
  console.log(word)
  await Post.find(query)
    .populate("user")
    .then(async (posts) => {
      posts.reverse();
      postsWithCommentCount = await getPostWithComments(posts)
         res.json(postsWithCommentCount);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/tag/:tagname").get(async (req, res) => {
  const word = req.params.tagname
  const query = { tags: { $regex: new RegExp(word, "i") } };
  await Post.find(query)
    .populate("user")
    .then(async (posts) => {
      posts.reverse();
      postsWithCommentCount = await getPostWithComments(posts)
         res.json(postsWithCommentCount);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});



router.route("/add").post((req, res) => {
  const user = req.body.user;
  const heading = req.body.heading;
  const content = req.body.content;
  const tags = req.body.tags;

  const newPost = new Post({
    user,
    heading,
    content,
    tags,
  });

  newPost
    .save()
    .then(() => res.json("Post created"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(async (req, res) => {
  Post.findById(req.params.id)
    .populate("user")
    .then((post) => {
      res.json(post);
    })
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.json("post deleted"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/user/:id").get((req, res) => {
  Post.find({ user: req.params.id })
    .populate("user")
    .then(async (posts) => {
      posts.reverse();
      postsWithCommentCount = await getPostWithComments(posts)
         res.json(postsWithCommentCount);
    
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.heading = req.body.heading;
      post.content = req.body.content;
      post.tags = req.body.tags;

      post
        .save()
        .then(() => res.json("post updated"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error:" + err));
});

module.exports = router;
