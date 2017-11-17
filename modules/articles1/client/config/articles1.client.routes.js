'use strict';

// Setting up route
angular.module('articles1').config(['$stateProvider',
  function ($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('articles1', {
        abstract: true,
        url: '/journal',
        template: '<ui-view/>'
      })
      .state('articles1.list', {
        url: '',
        templateUrl: 'modules/articles1/client/views/list-articles1.client.view.html'
      })
      .state('articles1.create', {
        url: '/create',
        templateUrl: 'modules/articles1/client/views/create-article1.client.view.html',
        data: {
          roles: ['user']
        }
      })
      .state('articles1.view', {
        url: '/:article1Id',
        templateUrl: 'modules/articles1/client/views/view-article1.client.view.html'
      })
      .state('articles1.edit', {
        url: '/:article1Id/edit',
        templateUrl: 'modules/articles1/client/views/edit-article1.client.view.html',
        data: {
          roles: ['user']
        }
      });
  }
]);
