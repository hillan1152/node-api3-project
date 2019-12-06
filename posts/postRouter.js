const express = require('express');

const router = express.Router();

// IMPORT DATA
const userDb = require('../users/userDb');
const postDb = require('./postDb');

router.get('/', (req, res) => {
  // do your magic!
  postDb.get(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving Posts.'})
    })
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.post.id;

  postDb.getById(id)
    .then(posts => {
      if(posts){
        res.status(200).json(posts)
      } else {
        res.status(404).json({ message: "Specified Post id does not exist"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving Posts.'})
    })

});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.post.id;  

  postDb.remove(id)
    .then(removePost => {
      if(removePost){
        console.log("remove", removePost)
        res.status(202).json({ message: "Post Removed Successfully!"})
      } else {
        res.status(404).json({ message: "Post with specified id does not exist"})
      }
    })
    .catch(err => {
      res.status(400).json({ error: 'The post could not be removed'})
   })
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  const id = req.post.id;

  postDb.update(id, req.body)
    .then(edit => {
      res.status(200).json({...edit,...req.body, message: "successfully updated"});
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Post could not be modified'})
    })
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const id = req.params.id;

  postDb.getById(id)
    .then(post => {
      if(!post){
        res.status(400).json({ message: "Invalid post ID."})
      } else {
        req.post = post;
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Post Information Untouchable! "})
    })
}

module.exports = router;
