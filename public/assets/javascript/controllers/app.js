/**
 * Created by Ale on 3/17/16.
 */
angular.module('myShopApp', [])
  .controller('ShopController', function($scope, $http) {

    var shopTracker = this;
    shopTracker.items = [];

    shopTracker.login = function() {
      shopTracker.loggedin = true;

      console.log("Attempting to login");

      $http({
        method: "POST",
        url: "/login",
        data: {
          username: shopTracker.username,
          password: shopTracker.password,
          money: shopTracker.money,
          collected: shopTracker.collected
        }
      }).then(function(result){
        console.log("User was successfully logged in");

        shopTracker.username = result.data.username;
        shopTracker.userId = result.data._id;
        shopTracker.money = result.data.money;
        shopTracker.collected = result.data.collected;
      });

    };

    shopTracker.getItems = function() {
      $http({
        method: 'GET',
        url: '/items'
      }).then (function (result){
        //loop over the results and push them to the orderList.orders array
        console.log(result);

        for(var i = 0; i < result.data.length; i++){
          shopTracker.items.push(result.data[i]);
        }
      });
    };

    shopTracker.addItem = function(){
      console.log("Attempting to add item");

      $http({
        method: "POST",
        url: "/addItem",
        data: {
          name: shopTracker.name,
          description: shopTracker.description,
          price: shopTracker.price,
          username: shopTracker.username
        }
      }).then(function(result){
        console.log("Item was successfully added");

        console.log(result);
        shopTracker.getItems();

      });
    };


    shopTracker.postComment = function(item) {

      console.log("Attempting to post comment");
      $http({
        method: "POST",
        url: "/comment",
        data: {
          thecomment: item.tempcomment,
          id: item._id,
          username: shopTracker.username
        }
      }).then(function(result){
        console.log("Comment was successfully posted");
        shopTracker.items = result.data;
      });
    };


    shopTracker.buyItem = function(item){
      console.log("Attempting to buy item");

      console.log(item);
      $http({
        method: "POST",
        url: "/buyItem",
        data: {
          name: item,
          username: shopTracker.username
        }
      }).then(function(result){
        console.log("Item was baught");
        shopTracker.items = result.data;
      });
    };


    shopTracker.getItems();

  });