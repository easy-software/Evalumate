angular.module('email').controller('EmailController', ['$scope', 'Email' ,
	function($scope, Email, $location {
		$scope.clicked = function( path ){
       window.location = "#/wait-for-response";
 }

	}]);
