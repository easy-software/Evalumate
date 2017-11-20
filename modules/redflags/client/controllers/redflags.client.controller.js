(function () {
  'use strict';

  // Redflags controller
  angular
    .module('redflags')
    .controller('RedflagsController', RedflagsController);

  RedflagsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'redflagResolve'];

  function RedflagsController ($scope, $state, $window, Authentication, redflag) {
    var vm = this;

    vm.authentication = Authentication;
    vm.redflag = redflag;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Redflag
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.redflag.$remove($state.go('redflags.list'));
      }
    }

    // Save Redflag
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.redflagForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.redflag._id) {
        vm.redflag.$update(successCallback, errorCallback);
      } else {
        vm.redflag.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('redflags.view', {
          redflagId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
