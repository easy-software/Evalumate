// Redflags service used to communicate Redflags REST endpoints
(function () {
  'use strict';

  angular
    .module('redflags')
    .factory('RedflagsService', RedflagsService);

  RedflagsService.$inject = ['$resource'];

  function RedflagsService($resource) {
    return $resource('api/redflags/:redflagId', {
      redflagId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
