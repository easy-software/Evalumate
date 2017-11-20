// Assessments service used to communicate Assessments REST endpoints
(function () {
  'use strict';

  angular
    .module('assessments')
    .factory('AssessmentsService', AssessmentsService);

  AssessmentsService.$inject = ['$resource'];

  function AssessmentsService($resource) {
    return $resource('api/assessments/:assessmentId', {
      assessmentId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
