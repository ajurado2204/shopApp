/**
 * Created by Ale on 3/17/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  money: {
    type: Number
  },
  collected: []
});

var users = mongoose.model('users', User);
module.exports = users;