(function () {
  'use strict';

  angular
    .module('ways2grows')
    .controller('Ways2growsListController', Ways2growsListController);

  Ways2growsListController.$inject = ['Ways2growsService'];

  function Ways2growsListController(Ways2growsService) {
    var vm = this;

    vm.ways2grows = Ways2growsService.query();
  }
}());
