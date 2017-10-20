(function () {
  'use strict';

  angular
    .module('emas')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Emotional Maturity Assessment',
      state: 'emas',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'emas', {
      title: 'List Emas',
      state: 'emas.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'emas', {
      title: 'Create Ema',
      state: 'emas.create',
      roles: ['user']
    });
  }
}());
