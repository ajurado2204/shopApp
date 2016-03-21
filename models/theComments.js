/**
 * Created by Ale on 3/17/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comments = new Schema({
  thecomment: {
    type: String
  },
  username: {
    type: String
  }
});

var comments = mongoose.model('comments', Comments);
module.exports = comments;