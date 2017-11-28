(function () {
  'use strict';

  angular
    .module('assessments')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Take Quiz',
      state: 'assessments',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'Emotional Maturity Quiz (EMQ)',
      state: 'assessments.emotional-maturity-landing'
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'Romantic Attraction Quiz (RMQ)',
      state: 'assessments.romantic-attraction-landing'
    });


    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'My Emotional Maturity (EM)',
      state: 'assessments.create',
      roles: ['user']
    });

  }
}());
