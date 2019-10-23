const express = require('express');

const app = express();


app.use('/api/posts',(req, res, next) => {
  const posts = [
    {title: 'post 1', content: 'post 1 content', id: Math.random()},
    {title: 'post 2', content: 'post 2 content', id: Math.random()},
  ]
  res.status(200).json({
    message: 'Posts fetched succesfully',
    posts
  });
});

module.exports = app;
