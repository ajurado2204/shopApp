/**
 * Created by Ale on 3/20/16.
 */
var mongoose = require('mongoose');

var db = 'mongodb://localhost/shopstuff';
mongoose.connect(db);

var Item = require('./models/theItems');
var User = require('./models/theUsers');

var user1 = new User({
  username: 'ajurado',
  money: 100000,
  password: 'password',
  collected: ['Game of Thrones', '4 Cups']
});

user1.save(function(err){
  if(err) {
    return err;
  }

  var newItem1 = new Item({
    name: 'Mountain Bike',
    description: 'Awesome bike in great condition',
    price: '200',
    itemSold: false,
    _owner: user1.id
  });

  newItem1.save(function(err){
    if(err) {
      return err;
    }

    console.log('User 2 created item.')
  });


  var newItem2 = new Item({
    name: 'Skullcandy Headphones',
    description: 'Fantastic headphones.',
    price: '75',
    itemSold: false,
    _owner: user1.id
  });

  newItem2.save(function(err){
    if(err) {
      return err;
    }

    console.log('User 1 created item.')
  });

});


var user2 = new User({
  username: 'Shamoon',
  money: 500000,
  password: 'password',
  collected: []
});

user2.save(function(err){
  if(err) {
    return err;
  }

  var newItem3 = new Item({
    name: 'The Big Short',
    description: 'Awesome fantastic book',
    price: '20',
    itemSold: false,
    _owner: user2.id
  });

  newItem3.save(function(err){
    if(err) {
      return err;
    }

    console.log('User 2 created item.')
  });

});


var user3 = new User({
  username: 'Jane',
  money: 2000,
  password: 'password',
  collected: []
});

user3.save(function(err){
  if(err) {
    return err;
  }

  var newItem4 = new Item({
    name: 'Sneakers',
    description: 'Running shoes size 7 women',
    price: '40',
    itemSold: false,
    _owner: user3.id
  });

  newItem4.save(function(err){
    if(err) {
      return err;
    }

    console.log('User 3 created item.')
  });

  var newItem5 = new Item({
    name: 'Golf club set',
    description: 'Full set',
    price: '500',
    itemSold: false,
    _owner: user3.id
  });

  newItem5.save(function(err){
    if(err) {
      return err;
    }

    console.log('User 3 created item.')
  });

});
