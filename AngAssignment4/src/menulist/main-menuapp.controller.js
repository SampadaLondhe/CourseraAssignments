(function() {
'use strict';

angular.module('MenuApp')

.controller('MenuAppController', MenuAppController);

MenuAppController.$inject=['items'];

function MenuAppController(items){
  var menu = this;
  menu.categories = items.data;
}

})();
