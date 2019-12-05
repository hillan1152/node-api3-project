const express = require('express');

const router = express.Router();

// IMPORT DATA
const userDb = require('./userDb');
const postDb = require('../posts/postDb')
router.post('/', validateUser, (req, res) => {
  // do your magic!
  userDb.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
});

router.post('/:id/posts', [validateUserId, validatePost], (req, res) => {
  // do your magic!
  if(req.params.id){
    postDb.insert(req.body)
      .then(post => res.status(201).json(post))
      .catch(err => res.status(400).json({ errorMessage: 'Error with ID'}))
  } else
    res.status(400).json({ message: 'Error Posting Text.'})
});

router.get('/', (req, res) => {
  // do your magic!
  userDb.get(req.query) 
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving data.'})
    })

});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  const id = req.user.id

  userDb.getById(id)
    .then(user => {
      console.log('This is user', user)
      if(user){
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "Specified id does not exist"})
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The id could not be retrieved." })
    })
  
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
    const id = req.params.id;
    userDb.getById(id)
      .then(user => {
        console.log('USER', user)
        if(!user){
          res.status(400).json({ message: 'Invalid user id.'})
        } else {
          req.user = user;
          next()
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved."})
      })
}

function validateUser(req, res, next) {
  // do your magic!
    const userData = req.body

    if(Object.keys(userData).length === 0){
      res.status(400).json({ message: "missing user data" })
    } else if (userData && !userData.name){
      res.status(400).json({ message: "missing required name field" })
    } else {
      next()
    }
}

function validatePost(req, res, next) {
  // do your magic!
  const postData = req.body;

  if(Object.keys(postData).length === 0){
    res.status(400).json({ message: "missing post data" })
  } else if (postData && !postData.text){
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }

}

module.exports = router;
