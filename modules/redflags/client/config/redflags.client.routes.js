(function () {
  'use strict';

  angular
    .module('redflags')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('redflags', {
        abstract: true,
        url: '/redflags',
        template: '<ui-view/>'
      })
      .state('redflags.list', {
        url: '',
        templateUrl: 'modules/redflags/client/views/list-redflags.client.view.html',
        controller: 'RedflagsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Redflags List'
        }
      })
      .state('redflags.create', {
        url: '/create',
        templateUrl: 'modules/redflags/client/views/form-redflag.client.view.html',
        controller: 'RedflagsController',
        controllerAs: 'vm',
        resolve: {
          redflagResolve: newRedflag
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Redflags Create'
        }
      })
      .state('redflags.edit', {
        url: '/:redflagId/edit',
        templateUrl: 'modules/redflags/client/views/form-redflag.client.view.html',
        controller: 'RedflagsController',
        controllerAs: 'vm',
        resolve: {
          redflagResolve: getRedflag
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Redflag {{ redflagResolve.name }}'
        }
      })
      .state('redflags.view', {
        url: '/:redflagId',
        templateUrl: 'modules/redflags/client/views/view-redflag.client.view.html',
        controller: 'RedflagsController',
        controllerAs: 'vm',
        resolve: {
          redflagResolve: getRedflag
        },
        data: {
          pageTitle: 'Redflag {{ redflagResolve.name }}'
        }
      });
  }

  getRedflag.$inject = ['$stateParams', 'RedflagsService'];

  function getRedflag($stateParams, RedflagsService) {
    return RedflagsService.get({
      redflagId: $stateParams.redflagId
    }).$promise;
  }

  newRedflag.$inject = ['RedflagsService'];

  function newRedflag(RedflagsService) {
    return new RedflagsService();
  }
}());
