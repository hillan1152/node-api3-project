const express = require('express');

const router = express.Router();

// IMPORT DATA
const userDb = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
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
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
