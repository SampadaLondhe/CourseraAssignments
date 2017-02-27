(function() {
  'use strict';

  angular.module('data')
  .controller('ItemListController', ItemListController);

  ItemListController.$inject=['list'];
  function ItemListController(list) {
    var $ctrl = this;
      $ctrl.items = list.data.menu_items;
    console.log($ctrl.items);
  }
})();
