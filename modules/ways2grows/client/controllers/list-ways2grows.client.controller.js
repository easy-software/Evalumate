
'use strict';

// Ways2Grow controller
angular.module('ways2grows').controller('Ways2growsListController', ['$scope', '$window', '$stateParams', '$location', 'Authentication', 'Ways2growsService',
  function ($scope, $window, $stateParams, $location, Authentication, Ways2growsService) {
    $scope.authentication = Authentication;
  

    $scope.create = function (selectedOptionsValue, lastSpinDayValue,lastSpinMonthValue,lastSpinYearValue/*isValid*/) {
      $scope.error = null;


      // Create new ways2grow object
      var ways2grow = new Ways2growsService({
        lastSpinDay: lastSpinDayValue,
        lastSpinMonth: lastSpinMonthValue,
        lastSpinYear: lastSpinYearValue,
        selectedOptions: selectedOptionsValue,
      });
      //console.log(ways2grow.lastSpin);

      // Redirect after save
      ways2grow.$save(function (response) {

        $scope.find();
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    //borrowed this from Articles controller - not used
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



      var ways2grow = $scope.ways2grows[0];


      ways2grow.$update(function () {
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };


    // Find a list of ways2grow documents
    $scope.find = function () {
      $scope.ways2grows = Ways2growsService.query();
      console.log($scope.ways2grows);

    };

    // Find existing ways2grow document
    $scope.findOne = function () {
      $scope.ways2grow = Ways2growsService.get({
        ways2growId: $stateParams.ways2growId
      });
    };
  }
]);
