(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UserService', 'MenuService'];
  function SignUpController(UserService, MenuService) {
    var signUpCtrl = this;
    signUpCtrl.errMsg = false;

    signUpCtrl.submit = function () {
      console.log(signUpCtrl.favoriteDish);
    return MenuService.getMenuItem(signUpCtrl.favoriteDish)
    .then(function (favitemDetails) {
            UserService.setUser(signUpCtrl.firstname, signUpCtrl.lastname,
                                signUpCtrl.email, signUpCtrl.phone, favitemDetails);
            signUpCtrl.errMsg = false;
            signUpCtrl.signUpSuccess = true;
    })
    .catch(function(error){
      signUpCtrl.errMsg = true;
      signUpCtrl.signUpSuccess = false;
    })
  };
}
})();
