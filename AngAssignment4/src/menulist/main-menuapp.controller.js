(function() {

angular.module('MenuApp')

.controller('MenuAppController', MenuAppController);

MenuAppController.$inject=['items'];

function MenuAppController(items){
  var menu = this;
  menu.categories = items.data;

  // menu.$onInit = function() {
  //   var promise = MenuDataService.getAllCategories();
  //   promise.then (function (result) {
  //   menu.categories = result.data;
  // console.log(menu.categories);
  //   });
  // };
}

})();
