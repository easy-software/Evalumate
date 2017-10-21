(function () {
  'use strict';

  angular
    .module('ways2grows')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Ways2grow',
      state: 'ways2grows',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'ways2grows', {
      title: 'List Ways2grows',
      state: 'ways2grows.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'ways2grows', {
      title: 'Create Ways2grow',
      state: 'ways2grows.create',
      roles: ['user']
    });
  }
}());
