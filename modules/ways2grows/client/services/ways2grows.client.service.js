// Ways2grows service used to communicate Ways2grows REST endpoints
(function () {
  'use strict';

  angular
    .module('ways2grows')
    .factory('Ways2growsService', Ways2growsService);

  Ways2growsService.$inject = ['$resource'];

  function Ways2growsService($resource) {
    return $resource('api/ways2grows/:ways2growId', {
      ways2growId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
