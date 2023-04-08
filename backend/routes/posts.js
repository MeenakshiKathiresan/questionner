const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get(
    (req, res) => {
        Post.find().populate('user')
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json("Error: "+ err));
    }
)

router.route('/add').post((req,res) => {
    const user = req.body.user;
    const heading = req.body.heading;
    const content = req.body.content;
    const tags = req.body.tags;

    const newPost = new Post({
        user,
        heading,
        content, 
        tags
    });

    newPost.save()
    .then(() => res.json('Post created'))
    .catch(err => res.status(400).json('Error: '+ err));
})

router.route('/:id').get(async (req,res) => {
    Post.findById(req.params.id).populate('user')
    .then(post => 
      {  res.json(post);
     console.log(post);}
    
    )
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/:id').delete((req,res) => {
    Post.findByIdAndDelete(req.params.id)
    .then(() => res.json('post deleted'))
    .catch(err => res.status(400).json('Error' + err));
})

router.route('/update/:id').post((req, res) =>{
    Post.findById(req.params.id)
    .then(post => {
        post.heading = req.body.heading;
        post.content = req.body.content;
        post.tags = req.body.tags;

        post.save()
        .then(() => res.json('post updated'))
        .catch(err => res.status(400).json('Error: '+ err))
    })
    .catch(err => res.status(400).json('Error:'+err))
})





module.exports = router;