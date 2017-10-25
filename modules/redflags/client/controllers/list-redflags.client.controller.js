(function () {
  'use strict';

  angular
    .module('redflags')
    .controller('RedflagsListController', RedflagsListController);

  RedflagsListController.$inject = ['RedflagsService'];

  function RedflagsListController(RedflagsService) {
    var vm = this;

    vm.redflags = RedflagsService.query();
  }
}());
