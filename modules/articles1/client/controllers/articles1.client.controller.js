'use strict';

// Articles controller
angular.module('articles1').controller('Articles1Controller', ['$scope', '$window', '$stateParams', '$location', 'Authentication', 'Articles1',
  function ($scope, $window, $stateParams, $location, Authentication, Articles1) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'article1Form');

        return false;
      }

      // Create new Article object
      var article1 = new Articles1({
        title: this.title,
        content: this.content,
        mantra: this.mantra
      });
      
      // Redirect after save
      article1.$save(function (response) {
        //$location.path('articles1/' + response._id);

        // Clear form fields
        $scope.title = '';
        $scope.content = '';
        $scope.mantra = '';
        $window.location.reload();
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Article
    $scope.remove = function (article1) {
      if (article1) {
        article1.$remove();

        for (var i in $scope.articles1) {
          if ($scope.articles1[i] === article1) {
            $scope.articles1.splice(i, 1);
          }
        }
      } else {
        $scope.article1.$remove(function () {
          $location.path('journal'); //this works
        });
      }
    };

    // Update existing Article
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'article1Form');

        return false;
      }

      var article1 = $scope.article1;

      article1.$update(function () {
        $location.path('journal/' + article1._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles1 = Articles1.query();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article1 = Articles1.get({
        article1Id: $stateParams.article1Id
      });
    };
  }
]);
