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
      title: 'Romantic Attraction (RA)',
      state: 'assessments.romantic-attraction-landing'
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'Emotional Maturity (EM)',
      state: 'assessments.emotional-maturity-landing'
    });

   
    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'assessments', {
      title: 'My Emotional Maturity (EM)',
      state: 'assessments.create',
      roles: ['user']
    });
    
  }
}());
