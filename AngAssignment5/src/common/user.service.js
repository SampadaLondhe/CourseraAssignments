(function() {
  'use strict';

  angular.module('common')
    .service('UserService', UserService);
    UserService.$inject = ['MenuService'];

  function UserService(MenuService) {
    var service = this;
    var user;

    //service.setUser = function(userInfo) {
    service.setUser = function(ufname, ulname, uemail, uphone, favitemDetails) {
      user = {
        firstName: ufname,
        lastName: ulname,
        email: uemail,
        phone: uphone,
        favoriteDish: favitemDetails.short_name,
        favoriteMenuItem: favitemDetails.name,
        description: favitemDetails.description
      };
    };

    service.getUser = function() {
      return user;
    };
  }
})();
