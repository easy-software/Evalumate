// (function () {
//   'use strict';
//
//   angular
//     .module('ways2grows')
//     .controller('Ways2growsListController', Ways2growsListController);
//
//   Ways2growsListController.$inject = ['Ways2growsService'];
//
//   function Ways2growsListController(Ways2growsService) {
//     var vm = this;
//     vm.ways2grows = Ways2growsService.query();
//   }
// }());
'use strict';

// Ways2Grow controller
angular.module('ways2grows').controller('Ways2growsListController', ['$scope', '$window', '$stateParams', '$location', 'Authentication', 'Ways2growsService',
  function ($scope, $window, $stateParams, $location, Authentication, Ways2growsService) {
    $scope.authentication = Authentication;
    //$scope.ways2grows = Ways2growsService.query();
    // Create new Article
//     $scope.isEmpty = function(number) {
//          if(number == 10){// you can change it however you want
//             $scope.staff.staffTotal == 0;
//             return true;
//
//           }else{
//             $scope.staff.staffTotal == number;
//             return true;
//           }
// };

    $scope.create = function (selectedOptionsValue, lastSpinDayValue,lastSpinMonthValue,lastSpinYearValue/*isValid*/) {
      $scope.error = null;

    //  if (!isValid) {
        //$scope.$broadcast('show-errors-check-validity', 'articleForm');

      //  return false;
      //}

      // Create new Article object
      var ways2grow = new Ways2growsService({
        lastSpinDay: lastSpinDayValue,
        lastSpinMonth: lastSpinMonthValue,
        lastSpinYear: lastSpinYearValue,
        selectedOptions: selectedOptionsValue,
      });
      //console.log(ways2grow.lastSpin);

      // Redirect after save
      ways2grow.$save(function (response) {
        //$location.path('articles/' + response._id);

        // Clear form fields
        //$scope.lastSpinDay = '';
        //$scope.lastSpinMonth = '';
        //$scope.lastSpinYear = '';
        //$scope.selectedOptions = '';
        //console.log($scope.ways2grow.lastSpinDay + "vdvjiefhievinev");
        // $scope.ways2grow.lastSpinDay = '';
        // $scope.ways2grow.lastSpinMonth = '';
        // $scope.ways2grow.lastSpinYear = '';
        // $scope.ways2grow.selectedOptions = '';
        //$scope.findAndRemove();
        //$window.location.reload();
        $scope.find();
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.ways2grows) {
          if ($scope.ways2grows[i] === article) {
            $scope.ways2grows.splice(i, 1);
          }
        }
      } else {
        $scope.ways2grows.$remove(function () {
          $location.path('ways2grows'); //this works
        });
      }
    };

    // Update existing Article
    $scope.update = function (/*isValid*/) {
      $scope.error = null;

      //if (!isValid) {
        //$scope.$broadcast('show-errors-check-validity', 'articleForm');

        //return false;
      //}

      var ways2grow = $scope.ways2grows[0];
      //console.log(ways2grow.lastSpinDay + " hguwjhwej");
      //console.log(lastSpinDayValue);
      //ways2grow.lastSpinDay = lastSpinDayValue;
      //ways2grow.lastSpinMonth= lastSpinMonthValue;
      //ways2grow.lastSpinYear= lastSpinYearValue;
      //ways2grow.selectedOptions= selectedOptionsValue;

      ways2grow.$update(function () {
        //$window.location.reload();
        //$scope.find();
        //$location.path('ways2grows/');
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    // Find a list of Articles
    $scope.find = function () {
      //$scope.ways2grows = Ways2growsService.findById("5a08dca2b437ad9260402679");
      $scope.ways2grows = Ways2growsService.query();
      console.log($scope.ways2grows);
      // $scope.ways2grows.$promise.then(function(data){
      //   //console.log(data[0].lastSpin);
      //   //console.log(data[0].selectedOptions);
      //   //console.log("this is the data" + data[1].lastSpinDay);
      //   console.log(data.length + " this is the length of the data");
      //   console.log(data.length-1 + " this is the length of the data -1");
      //   if(data !== null && data !== undefined && data.length>0){
      //     console.log(data);
      //     console.log(data[0]._id);
      //     //var ways2growDocument = Ways2growsSer
      //     $scope.lastSpinDay = data[0].lastSpinDay;
      //     $scope.lastSpinMonth = data[0].lastSpinMonth;
      //     $scope.lastSpinYear = data[0].lastSpinYear;
      //     $scope.selectedOptions = data[0].selectedOptions;
      //     $scope.ways2growId = data[0]._id;
      //   }
        // $scope.ways2grow.lastSpinDay = data[0].lastSpinDay;
        // $scope.ways2grow.lastSpinMonth = data[0].lastSpinMonth;
        // $scope.ways2grow.lastSpinYear = data[0].lastSpinYear;
        // $scope.ways2grow.selectedOptions = data[0].selectedOptions;
        // $scope.ways2grow.lastSpinDay = data[0].ways2grow.lastSpinDay;
        // $scope.ways2grow.lastSpinMonth = data[0].ways2grow.lastSpinMonth;
        // $scope.ways2grow.lastSpinYear = data[0].ways2grow.lastSpinYear;
        // $scope.ways2grow.selectedOptions = data[0].ways2grow.selectedOptions;
      //});
    };

    /*$scope.id = ''
		$scope.ways2grow.$promise.then(function(data) {
			$scope.id = data[0]._id;
			$scope.ways2grow = Ways2growsService.get({
				ways2growId: $scope.id
			});
		});*/

    // Find existing Article
    $scope.findOne = function () {
      $scope.ways2grow = Ways2growsService.get({
        ways2growId: $stateParams.ways2growId
      });
    };
  }
]);
