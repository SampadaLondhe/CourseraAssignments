(function() {
  'use strict';

  angular.module('data')
  .component('itemList', {
    templateUrl: 'src/menulist/templates/itemlist.template.html',
    bindings: {
      items: '<'
    }
  });

})();
