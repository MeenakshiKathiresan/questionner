const router = require("express").Router();
let Comment = require("../models/comment.model");

router.route("/add/:id").post((req, res) => {
  const user = req.body.user;
  const post = req.body.post;
  const text = req.body.text;
  const upvotes = req.body.upvotes;
  const downvotes = req.body.downvotes;

  const newComment = new Comment({
    text,
    user,
    post,
    upvotes,
    downvotes,
  });

  newComment
    .save()
    .then(() => {
      Comment.findById(newComment._id)
        .populate("user")
        .then((comment) => {
          res.json(comment);
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get(async (req, res) => {
  Comment.find({ post: req.params.id })
    .populate("user")
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/upvote/:id").put(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.json("Comment not found");
    }

    const isUpvoted = comment.upvotes.includes(req.body.user);
    if (isUpvoted) {
      comment.upvotes = comment.upvotes.filter(
        (upvote) => upvote != req.body.user
      );
    } else {
      comment.upvotes.push(req.body.user);
      comment.downvotes = comment.downvotes.filter(
        (downvote) => downvote != req.body.user
      );
    }
    await comment.save();
    res.json("upvoted!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/downvote/:id").put(async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.json("Comment not found");
    }

    const isDownvoted = comment.downvotes.includes(req.body.user);
    if (isDownvoted) {
      comment.downvotes = comment.downvotes.filter(
        (downvote) => downvote != req.body.user
      );
    } else {
      comment.downvotes.push(req.body.user);
      comment.upvotes = comment.upvotes.filter(
        (upvote) => upvote != req.body.user
      );
    }
    await comment.save();
    res.json("downvoted!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.route("/:id").delete((req, res) => {
  //check if logged in user is the same as the commenter
  Comment.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json("comment deleted");
    })
    .catch((err) => res.status(400).json("Error" + err));
});

module.exports = router;
