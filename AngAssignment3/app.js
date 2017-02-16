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
  list.listIsEmpty = function(){
        return list.items.length == 0;
      }
}

NarrowItDownController.$inject=["MenuSearchService","$filter"];
function NarrowItDownController(MenuSearchService,$filter){
  var menu=this;
  menu.searchTerm = '';
  menu.notFound = false;

  menu.doSearch = function(){
        var promise = MenuSearchService.getMatchedMenuItems();
        promise.then(function(response){
          menu.items = [];
            if (menu.searchTerm.trim() != ''){
                menu.items = $filter('filter')(response.data.menu_items, {description: menu.searchTerm.trim()});
                  console.log(menu.items);
                if (menu.items.length == 0){
                    menu.notFound = true;
                }else{
                    menu.notFound = false;
                }
            }else{
                menu.foundItems = [];
                menu.notFound = true
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }

  menu.removeItem=function(itemIndex){
      foundItems.splice(itemIndex,1);
  };
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
    var service = this;

    service.getMatchedMenuItems = function(){
    var menuItems=[];
        var response = $http({
            method: "GET",
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      });

        return response;
    }
}
})()
