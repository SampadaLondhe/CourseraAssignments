(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UserService', 'MenuService'];
  function SignUpController(UserService, MenuService) {
    var $ctrl = this;
    $ctrl.signUpSuccess = false;
    $ctrl.favoriteDishFound = false;
    $ctrl.submit = function(event) {
      event.preventDefault();
      var user = {
            firstName: $ctrl.firstName,
            lastName: $ctrl.lastName,
            email: $ctrl.email,
            phone: $ctrl.phone,
            favoriteDish: $ctrl.favoriteDish
      };

      MenuService.getMenuItem($ctrl.favoriteDish)
        .then(function(response) {
          console.log(response);
          user.favoriteMenuItem = response;
          UserService.setUser(user);
          $ctrl.favoriteDishFound = true;
          $ctrl.signUpSuccess = true;
        }, function(error) {
          UserService.setUser(user);
          $ctrl.favoriteDishFound = false;
          $ctrl.signUpSuccess = true;
        });
    };
  }
})();
