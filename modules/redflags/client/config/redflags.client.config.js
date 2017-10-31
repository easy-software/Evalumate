(function () {
  'use strict';

  angular
    .module('redflags')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Red Flags',
      state: 'redflags',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'redflags', {
      title: 'List Redflags',
      state: 'redflags.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'redflags', {
      title: 'Create Redflag',
      state: 'redflags.create',
      roles: ['user']
    });
  }
}());
