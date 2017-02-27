(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider','$urlRouterProvider'];

function RoutesConfig($stateProvider,$urlRouterProvider) {
  $urlRouterProvider.otherwise ('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })

  .state('categories', {
    url:'/categories',
    templateUrl:'src/menulist/templates/main-menulist.template.html',
    controller: 'MenuAppController as menu',
    resolve: {
      items: ['MenuDataService', function(MenuDataService) {
              return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('items', {
    url: '/itemslist/{categoryID}',
    templateUrl: 'src/menulist/templates/itemlist.template.html',
    controller: 'ItemListController as $ctrl',
    resolve: {
      list: ['$stateParams', 'MenuDataService',
            function($stateParams, MenuDataService) {
              var shortname = "";
              return MenuDataService.getAllCategories()
              .then(function(items) {
                shortname = items.data[$stateParams.categoryID].short_name;
                return shortname;
              })
              .then (function(shortname) {
                  return MenuDataService.getItemsForCategory(shortname);
              });
           }]
          }
      });
}
})();
