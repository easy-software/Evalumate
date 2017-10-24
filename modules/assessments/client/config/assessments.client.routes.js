(function () {
  'use strict';

  angular
    .module('assessments')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('assessments', {
        abstract: true,
        url: '/assessments',
        template: '<ui-view/>'
      })
      .state('assessments.emotional-maturity', {
        url: '',
        templateUrl: 'modules/assessments/client/views/emotional-maturity-assessment.client.view.html',
        controller: 'AssessmentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Assessments List'
        }
      })
      .state('assessments.create', {
        url: '/create',
        templateUrl: 'modules/assessments/client/views/form-assessment.client.view.html',
        controller: 'AssessmentsController',
        controllerAs: 'vm',
        resolve: {
          assessmentResolve: newAssessment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Assessments Create'
        }
      })
      .state('assessments.edit', {
        url: '/:assessmentId/edit',
        templateUrl: 'modules/assessments/client/views/form-assessment.client.view.html',
        controller: 'AssessmentsController',
        controllerAs: 'vm',
        resolve: {
          assessmentResolve: getAssessment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Assessment {{ assessmentResolve.name }}'
        }
      })
      .state('assessments.view', {
        url: '/:assessmentId',
        templateUrl: 'modules/assessments/client/views/view-assessment.client.view.html',
        controller: 'AssessmentsController',
        controllerAs: 'vm',
        resolve: {
          assessmentResolve: getAssessment
        },
        data: {
          pageTitle: 'Assessment {{ assessmentResolve.name }}'
        }
      });
  }

  getAssessment.$inject = ['$stateParams', 'AssessmentsService'];

  function getAssessment($stateParams, AssessmentsService) {
    return AssessmentsService.get({
      assessmentId: $stateParams.assessmentId
    }).$promise;
  }

  newAssessment.$inject = ['AssessmentsService'];

  function newAssessment(AssessmentsService) {
    return new AssessmentsService();
  }
}());
