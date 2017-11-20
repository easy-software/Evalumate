(function () {
  'use strict';

  // Ways2grows controller
  angular
    .module('ways2grows')
    .controller('Ways2growsController', Ways2growsController);

  Ways2growsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'ways2growResolve'];

  function Ways2growsController ($scope, $state, $window, Authentication, ways2grow) {
    var vm = this;

    vm.authentication = Authentication;
    vm.ways2grow = ways2grow;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Ways2grow
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.ways2grow.$remove($state.go('ways2grows.list'));
      }
    }

    // Save Ways2grow
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.ways2growForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.ways2grow._id) {
        vm.ways2grow.$update(successCallback, errorCallback);
      } else {
        vm.ways2grow.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('ways2grows.view', {
          ways2growId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
