'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
//<<<<<<< HEAD
      title: 'JOURNALS',
//=======
      title: 'JOURNAL',
//>>>>>>> 7ea04df0a54ffa5359bd5cc8794b4d0e7f2a783f
      state: 'articles',
      type: 'dropdown',
      roles: ['user'],
      position: 4
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Show Past Journal Entries',
      state: 'articles.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Create a New Journal Entry',
      state: 'articles.create',
      roles: ['user']
    });
  }
]);
