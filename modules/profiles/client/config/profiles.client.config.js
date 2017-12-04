(function () {
  'use strict';

  angular
    .module('profiles')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'PROFILE',
      state: 'profiles.list',
      type: 'button',
      roles: ['user'],
      positon: 1
    });


 
  }
}());
