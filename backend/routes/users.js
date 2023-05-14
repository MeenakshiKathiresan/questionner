const router = require("express").Router();
let User = require("../models/user.model");
let Post = require("../models/post.model");
let Comment = require("../models/comment.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/stats").get(async (req, res) => {
    try{
        const userId = req.query.user;
        

        const postsCount = await Post.countDocuments({ user: userId });
      
        const commentsCount = await Comment.countDocuments({ user: userId });
      
        const upvotesCount = await Comment.countDocuments({
            upvotes: { $in: [userId] }
          });
          
          const downvotesCount = await Comment.countDocuments({
            downvotes: { $in: [userId] },
          });
          
        const response = {
          postsCount: postsCount,
          commentsCount: commentsCount,
          downvotesCount: downvotesCount,
          upvotesCount: upvotesCount,
        };
      
        res.json(response);
    }catch(err){
        res.status(500).json({err:"internal server error"})
    }
  
});

module.exports = router;
