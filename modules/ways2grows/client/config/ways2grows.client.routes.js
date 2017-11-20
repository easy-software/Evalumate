(function () {
  'use strict';

  angular
    .module('ways2grows')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('ways2grows', {
        abstract: true,
        url: '/ways2grows',
        template: '<ui-view/>'
      })
      .state('ways2grows.list', {
        url: '',
        templateUrl: 'modules/ways2grows/client/views/list-ways2grows.client.view.html',
        controller: 'Ways2growsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Ways2grows List'
        }
      })
      .state('ways2grows.create', {
        url: '/create',
        templateUrl: 'modules/ways2grows/client/views/form-ways2grow.client.view.html',
        controller: 'Ways2growsController',
        controllerAs: 'vm',
        resolve: {
          ways2growResolve: newWays2grow
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Ways2grows Create'
        }
      })
      .state('ways2grows.edit', {
        url: '/:ways2growId/edit',
        templateUrl: 'modules/ways2grows/client/views/form-ways2grow.client.view.html',
        controller: 'Ways2growsController',
        controllerAs: 'vm',
        resolve: {
          ways2growResolve: getWays2grow
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ways2grow {{ ways2growResolve.name }}'
        }
      })
      .state('ways2grows.view', {
        url: '/:ways2growId',
        templateUrl: 'modules/ways2grows/client/views/view-ways2grow.client.view.html',
        controller: 'Ways2growsController',
        controllerAs: 'vm',
        resolve: {
          ways2growResolve: getWays2grow
        },
        data: {
          pageTitle: 'Ways2grow {{ ways2growResolve.name }}'
        }
      });
  }

  getWays2grow.$inject = ['$stateParams', 'Ways2growsService'];

  function getWays2grow($stateParams, Ways2growsService) {
    return Ways2growsService.get({
      ways2growId: $stateParams.ways2growId
    }).$promise;
  }

  newWays2grow.$inject = ['Ways2growsService'];

  function newWays2grow(Ways2growsService) {
    return new Ways2growsService();
  }
}());
