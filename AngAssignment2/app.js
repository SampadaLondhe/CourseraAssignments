(function(){
'use strict';
var shoppingList=[{ name: "Cookies", quantity: 10 },
                  { name: "Cake", quantity: 5 },
                  { name: "Wafers", quantity: 2 },
                  { name: "Apple", quantity: 4 },
                  { name: "Chocolates", quantity: 10 }];
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var ToBuy=this;
  ToBuy.items=shoppingList;
    ToBuy.removeItem=function(itemIndex){
    try{
      ShoppingListCheckOffService.removeItem(itemIndex);
    }
    catch (error)
    {
       ToBuy.errorMessage=error.message;
    }
    };
  }

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var AlreadyBought=this;

    AlreadyBought.items =ShoppingListCheckOffService.getItems();
}

function ShoppingListCheckOffService(){
  var service=this;
  var items=shoppingList;
  var BoughtList=[];

  service.removeItem=function(itemIndex){

   var item = {
     name: items[itemIndex].name,
     quantity: items[itemIndex].quantity
   };

      BoughtList.push(item);
      items.splice(itemIndex,1);

   if(items.length==0)
     {
       throw new Error ("Everything is bought!");
     }
  };

  service.getItems=function(){
       return(BoughtList);
  }
};

})();
