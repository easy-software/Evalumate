/*'use strict';

// Configuring the Articles module
angular.module('articles1').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Journals',
      state: 'articles1',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles1', {
      title: 'Show Past Journal Entries',
      state: 'articles1.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles1', {
      title: 'Create a New Journal Entry',
      state: 'articles1.create',
      roles: ['user']
    });
  }
]);
*/