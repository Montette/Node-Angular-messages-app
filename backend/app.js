const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');

const Post = require('./models/post');

global.app = app;
app.use(bodyParser.json());

const pass = 'C58SQkr6FxY9cw0Z';

mongoose.connect('mongodb+srv://monia:C58SQkr6FxY9cw0Z@messageapp-x8hxs.mongodb.net/test?retryWrites=true&w=majority', () => {
  console.log('connected')
});

app.use(morgan('dev'));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
});



app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  console.log(post);

  post.save(error => {
    if (error) {
      res.json({
        status: 'error',
        message: "Error occured"
      });

    };

    res.status(201).json({
      message: 'contact saved susscesfully',
      data: post
    });
  })

});

app.delete("/api/posts/:id", (req, res, next) => {


      Post.deleteOne({
        _id: req.params.id

      }, error => {
        if (error) {
          res.json({
            status: 'error',
            message: "Error occured"
          });

        }

        res.status(200).json({
          message: 'post removed susscesfully',
        });
      });

    });

    app.put('/api/posts/:postId', (req, res)=>{
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        _id: req.body.id
      });
      Post.updateOne({_id: req.params.postId}, post).then(result => {
        console.log(result);
        res.status(200).json({
          message: 'Post updted succesfull'
        })
      })

    })
    app.get('/', (req, res) => res.send('Hello World'));

    app.get('/api/posts/:postId', (req, res, next) => {

      Post.findById(req.params.postId).then(post => {
        if(post) {
          res.status(200).json({
            post
          })
        } else {
          res.status(404).json({
            message: 'Post not found'
          })
        }
      })
    });

    app.get('/api/posts', (req, res, next) => {

      Post.find((error, data) => {
        if (error) {
          res.json({
            status: 'error',
            message: "Error occured"
          });

        };

        res.status(200).json({
          message: 'contacts retrieved susscesfully',
          posts: data
        });
      })
    });

    module.exports = app;
