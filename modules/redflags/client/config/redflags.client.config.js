(function () {
  'use strict';

  angular
    .module('redflags')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'RED FLAGS',
      state: 'redflags.list',
      type: 'button',
      roles: ['user'],
      position: 3
    });

   
  }
}());
