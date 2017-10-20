// Emas service used to communicate Emas REST endpoints
(function () {
  'use strict';

  angular
    .module('emas')
    .factory('EmasService', EmasService);

  EmasService.$inject = ['$resource'];

  function EmasService($resource) {
    return $resource('api/emas/:emaId', {
      emaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
