(function () {
  "use strict";

  angular.module('public')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['userDetails', 'ApiPath'];
  function MyInfoController(userDetails, ApiPath) {
    var $ctrl = this;
    $ctrl.successSigned = false;
    $ctrl.basePath = ApiPath;

    if(userDetails) {
      $ctrl.successSigned = true;
      $ctrl.firstName = userDetails.firstName;
      $ctrl.lastName = userDetails.lastName;
      $ctrl.email = userDetails.email;
      $ctrl.phone = userDetails.phone;
      $ctrl.favoriteDish = userDetails.favoriteDish;
      $ctrl.favoriteMenuItem = userDetails.favoriteMenuItem;
      $ctrl.description = userDetails.description;
    }
  }
})();
