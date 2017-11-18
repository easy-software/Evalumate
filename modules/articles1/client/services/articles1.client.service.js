'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles1').factory('Articles1', ['$resource',
  function ($resource) {
    return $resource('api/articles1/:article1Id', {
      article1Id: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
