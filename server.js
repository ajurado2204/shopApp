/**
 * Created by Ale on 3/17/16.
 */
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan');
var app = express();
var db = 'mongodb://localhost/shopstuff';
var PORT = process.env.PORT || 3001;

mongoose.connect(db);

var Item = require('./models/theItems');
var User = require('./models/theUsers');
var Comment = require('./models/theComments');

app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.get('/', function(req, res) {
  res.send(index.html);
});


app.post('/login', function(req, res) {

  console.log(req.body);
  User.findOne({
      'username': req.body.username,
      'password': req.body.password
    }).exec(function(err, user) {
      if (err) {
        console.log('error');
        res.send(err);
      }else {
        console.log(user);
        res.send(user);
      }
    });
});


app.get('/items', function(req, res){
  //find all items
  Item.find()
    .populate('_owner')
    .populate('comments')
    .exec({new:true}, function(err, items){
    if(err) {
      console.log(err);
      res.send(err);
    }else {
      res.send(items);
    }
  });
});



app.post('/comment', function(req, res) {
  console.log(req.body.thecomment);

  var newComment = new Comment({thecomment: req.body.thecomment, username: req.body.username});

  newComment.save(function(err, comment){
    if(err) {
      return err;
    }else {

      console.log(comment);
      Item.update({
        _id: req.body.id
      }, {
        $push: {
          'comments': comment._id
        }
      }, function(err, doc) {
       Item.find()
         .populate('comments')
         .exec(function(err, doc1){
           if (err) {
             console.log(err);
           } else {
             console.log(doc1);
             res.send(doc1);
           }
         })
      });
    }

  });

});



app.post('/addItem', function(req, res){
  console.log(req.body);

  var newItem = new Item(req.body);

  newItem.save(function(err, theNewItem){
    if(err) {
      return err;
    }else {
      res.send(theNewItem);
    }
  });

});


app.post('/buyItem', function(req, res){

  User.findOneAndUpdate({
    username: req.body.username
  }, {
      $push: {
        'collected': req.body.name
      }
    }, {new:true}, function(err, updatedUser) {
    if (err) {
      console.log(err);
    } else {
      Item.update({
        name: req.body.name
      }, {
        $set: {
          'itemSold': true
        }
      }, function(err, doc1) {

        console.log(doc1);
        Item.find()
          .exec(function(err, doc2){
            if (err) {
              console.log(err);
            } else {
              console.log(doc2);
              res.send(doc2);
            }
          });
      });

    }

  });
});


app.listen(PORT, function() {
  console.log("listening on port", PORT);
});