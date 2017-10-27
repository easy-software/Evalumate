'use strict';



angular.module('core').controller('EmailController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
		$scope.email1 = '';
		$scope.email2 = '';
		$scope.email3 = '';
		$scope.emailstring = '';

		$scope.getEmail = function(){
			$scope.emailstring = 'mailto:' + $scope.email1 + ',';
			$scope.emailstring += $scope.email2 + ',';
			$scope.emailstring += $scope.email3;
		};
		$scope.printEmail = function(){
			$scope.emailstring = 'action=\"mailto:' + $scope.email1 + ',';
			$scope.emailstring += $scope.email2 + ',';
			$scope.emailstring += $scope.email3 + '\"';
			console.log($scope.emailstring);
		};

  }]);
