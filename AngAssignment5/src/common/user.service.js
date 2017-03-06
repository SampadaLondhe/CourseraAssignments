(function() {
  "use strict";

  angular.module("common")
    .service("UserService", UserService);

  function UserService() {
    var service = this;
    var user;

    service.setUser = function(userInfo) {
      user = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phone: userInfo.phone,
        favoriteDish: userInfo.favoriteDish,
        favoriteMenuItem: userInfo.favoriteMenuItem
      };
    };

    service.getUser = function() {
      return user;
    };
  }
})();
