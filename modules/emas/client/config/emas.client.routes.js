(function () {
  'use strict';

  angular
    .module('emas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('emas', {
        abstract: true,
        url: '/emas',
        template: '<ui-view/>'
      })
      .state('emas.list', {
        url: '',
        templateUrl: 'modules/emas/client/views/list-emas.client.view.html',
        controller: 'EmasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Emas List'
        }
      })
      .state('emas.create', {
        url: '/create',
        templateUrl: 'modules/emas/client/views/form-ema.client.view.html',
        controller: 'EmasController',
        controllerAs: 'vm',
        resolve: {
          emaResolve: newEma
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Emas Create'
        }
      })
      .state('emas.edit', {
        url: '/:emaId/edit',
        templateUrl: 'modules/emas/client/views/form-ema.client.view.html',
        controller: 'EmasController',
        controllerAs: 'vm',
        resolve: {
          emaResolve: getEma
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Ema {{ emaResolve.name }}'
        }
      })
      .state('emas.view', {
        url: '/:emaId',
        templateUrl: 'modules/emas/client/views/view-ema.client.view.html',
        controller: 'EmasController',
        controllerAs: 'vm',
        resolve: {
          emaResolve: getEma
        },
        data: {
          pageTitle: 'Ema {{ emaResolve.name }}'
        }
      });
  }

  getEma.$inject = ['$stateParams', 'EmasService'];

  function getEma($stateParams, EmasService) {
    return EmasService.get({
      emaId: $stateParams.emaId
    }).$promise;
  }

  newEma.$inject = ['EmasService'];

  function newEma(EmasService) {
    return new EmasService();
  }
}());
