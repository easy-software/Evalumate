(function () {
  'use strict';

  angular
    .module('profiles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Profile',
      state: 'profiles',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'profiles', {
      title: 'List Profiles',
      state: 'profiles.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'profiles', {
      title: 'Create Profile',
      state: 'profiles.create',
      roles: ['user']
    });
  }
}());
