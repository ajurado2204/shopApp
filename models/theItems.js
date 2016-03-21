/**
 * Created by Ale on 3/17/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Items = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  price: {
    type: Number
  },
  itemSold: {
    type: Boolean
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

var theItems = mongoose.model('theItems', Items);
module.exports = theItems;