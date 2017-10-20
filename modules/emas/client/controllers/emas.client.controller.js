(function () {
  'use strict';

  // Emas controller
  angular
    .module('emas')
    .controller('EmasController', EmasController);

  EmasController.$inject = ['$scope', '$state', '$window', 'Authentication', 'emaResolve'];

  function EmasController ($scope, $state, $window, Authentication, ema) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ema = ema;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ema
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ema.$remove($state.go('emas.list'));
      }
    }

    // Save Ema
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.emaForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ema._id) {
        vm.ema.$update(successCallback, errorCallback);
      } else {
        vm.ema.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('emas.view', {
          emaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
