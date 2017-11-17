(function () {
  'use strict';

  angular
    .module('ways2grows')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Ways2grows',
      state: 'ways2grows.list',
      type: 'button',
      roles: ['user']
    });
 
 
  }
}());
