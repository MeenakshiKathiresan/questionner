const router = require('express').Router();
let Comment = require('../models/comment.model')


router.route('/add/:id').post((req,res) => {
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
        downvotes
    });

    newComment.save()
    .then(() => res.json('Comment created'))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/:id').get(async (req,res) => {
    Comment.find({post: req.params.id}).populate('user')
    .then(comments => 
      {  res.json(comments);
     console.log(comments);}
    
    )
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/:id').delete((req,res) => {
    Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json('post deleted'))
    .catch(err => res.status(400).json('Error' + err));
})

module.exports = router;