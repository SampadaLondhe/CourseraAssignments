(function() {
 'use strict';

  angular.module('MenuApp')
  .controller('ItemListController', ItemListController);

  ItemListController.$inject=['list'];

  function ItemListController(list) {
    var itemslist = this;
      itemslist.items = list.data.menu_items;
      console.log(itemslist.items);
      }
})();
