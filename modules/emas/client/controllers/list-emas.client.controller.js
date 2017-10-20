(function () {
  'use strict';

  angular
    .module('emas')
    .controller('EmasListController', EmasListController);


  EmasListController.$inject = ['EmasService'];

  function EmasListController(EmasService) {
  	// $scope.radioClicked= False;
    var vm = this;

    vm.emas = EmasService.query();
  }
}());
