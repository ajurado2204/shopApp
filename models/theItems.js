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
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }]
});

var theItems = mongoose.model('theItems', Items);
module.exports = theItems;