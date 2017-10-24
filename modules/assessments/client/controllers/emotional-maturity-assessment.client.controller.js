(function () {
  'use strict';

  angular
    .module('assessments')
    .controller('AssessmentsListController', AssessmentsListController);

  AssessmentsListController.$inject = ['AssessmentsService'];

  function AssessmentsListController(AssessmentsService) {
    var vm = this;

    vm.assessments = AssessmentsService.query();
  }
}());
