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
        onRemove: '&',
        empty: '<'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };
    return ddo;
  }

  function FoundItemsDirectiveController(){
    var list=this;
}


  NarrowItDownController.$inject=['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var menu = this;
    menu.empty=false;

    menu.doSearch = function(){
        var promise=MenuSearchService.getMatchedMenuItems(menu.searchTerm);
        promise.then(function(response){
        menu.items=response;
        menu.empty=MenuSearchService.isEmpty();
      })
    }
      menu.removeItem = function(itemIndex){
      MenuSearchService.removeItem(itemIndex);
    };
  }

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http){
    var service = this;
    var foundItems = [];
    service.getMatchedMenuItems = function (searchTerm) {
      foundItems=[];
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json",
      })
     .then(function (response){
      if(searchTerm !== undefined) {
       if(searchTerm.trim() !== ""){
         for(var i=0; i<response.data.menu_items.length; i++){
           var desc=response.data.menu_items[i].description.toLowerCase();
           var ser=searchTerm.toLowerCase();
           if(desc.indexOf(ser)>=0){
             foundItems.push(response.data.menu_items[i]);
           }
         }
         console.log(foundItems);
         return foundItems;
     }
  }
  })
  .catch(function(error){
    console.log(error);
  });
  }

  service.isEmpty = function(){
    if(foundItems.length == 0){
       return true;
    }
    else {
       return false;
    }
  }

  service.removeItem=function(itemIndex){
      foundItems.splice(itemIndex,1);
  }
  }
  })()
