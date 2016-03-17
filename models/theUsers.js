/**
 * Created by Ale on 3/17/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  }
});

var users = mongoose.model('users', User);
module.exports = users;