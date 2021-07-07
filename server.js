// IMPORT AND JOIN SERVER ROUTES
const express = require('express');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');
const server = express();

// IMPORT MIDDLWARE
server.use(express.json())
server.use('/api/users', logger, userRouter);
server.use('/api/posts', logger, postRouter);

server.get('/', logger, (req, res) => {
  res.send(`This is the node-api-3 project`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} to ${req.originalUrl} at [${new Date().toISOString()}].`)

  next();
}



module.exports = server;
