(function () {
  'use strict';

  angular
    .module('assessments')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Assessments',
      state: 'assessments',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'Emotional Maturity',
      state: 'assessments.emotional-maturity'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'Email Friend Assessment',
      state: 'assessments.create',
      roles: ['user']
    });
    
  }
}());
