const express = require('express');
const router = express.Router();
const Post = require('../models/post.model');


router.get('/posts', async (req, res) => {
  try {
    const result = await Post
      .find({status: 'published'})
      .select('author created title photo price _id')
      .sort({created: -1});
      setTimeout(() => {
        if(!result) res.status(404).json({ post: 'Not found' });
        else res.json(result);
      },1000);
    
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const result = await Post
      .findById(req.params.id);
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.post('/posts/', async (req, res) => {
  try {
    let post = new Post({...req.body});

    post.created = new Date();
    post.updated = post.created;
    post.status = 'published';

    const newPost = await post.save();
    if(newPost) res.status(201).json({ message: 'Post Added!', post: newPost });
  }
  catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
