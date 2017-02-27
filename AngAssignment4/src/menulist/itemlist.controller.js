(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('ItemListController', ItemListController);

  ItemListController.$inject=['list'];
  function ItemListController(list) {
    var $ctrl = this;
      $ctrl.items = list.data.menu_items;
  }
})();
