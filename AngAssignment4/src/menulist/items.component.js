(function() {
  'use strict';

  angular.module('MenuApp')
  .component('itemList', {
    templateUrl: 'src/menulist/templates/itemlist.template.html',
    bindings: {
      items: '<'
    }
  });

})();
