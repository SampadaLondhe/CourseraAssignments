(function() {
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .directive('foundItems',FoundItemsDirective);

  function FoundItemsDirective(){
    var ddo = {
      templateUrl: 'MenuList.html',
      scope : {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    var list=this;
    list.IsEmpty = function () {
      if(list.items!==undefined){
      if (list.items.length==0) {
          return true;
        }
      else{
          return false;
        }
      }
    };
  }

  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;

    menu.doSearch = function(){
        MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        menu.items = MenuSearchService.getItems();
        console.log( menu.items);

    };
      menu.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;
    var foundItems = [];
    service.getMatchedMenuItems = function (searchTerm) {
      var response = $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      });
    foundItems=[];
    var promise = response;
    console.log(response.data);
    promise.then(function (response){
    if(searchTerm !== undefined) {
     if(searchTerm.trim() !== ""){
       for(var i=0; i<response.data.menu_items.length; i++){
         var desc=response.data.menu_items[i].description.toLowerCase();
         var ser=searchTerm.toLowerCase();
         if(desc.indexOf(ser)>=0){
           foundItems.push(response.data.menu_items[i]);
         }
       }
     }
  }
  })
  .catch(function(error){
    console.log(error);
  });
  };

  service.getItems=function(){
      return foundItems;
  };

  service.removeItem=function(itemIndex){
      foundItems.splice(itemIndex,1);
  };
  }
  })()
