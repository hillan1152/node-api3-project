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
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
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
