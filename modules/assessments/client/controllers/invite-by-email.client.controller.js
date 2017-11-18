'use strict';

angular.module('assessments').controller('EmailController', ['$scope', 'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
		 $scope.authentication = Authentication;
		 $scope.email1 = '';
		 $scope.email2 = '';
		 $scope.email3 = '';
		 $scope.emailstring = '';
		 var send = document.getElementById('infoSubmit');

		 $scope.getEmail = function(){
			 $scope.emailstring = 'mailto:' + $scope.email1 + ',';
			 $scope.emailstring += $scope.email2 + ',';
			 $scope.emailstring += $scope.email3;
			 send.action = 'mailto:?bcc=' +$scope.email1 + ',' + $scope.email2 +',' + $scope.email3 + '&subject=lovED: ' +
			 'Your friend is awaiting your response to the emotional maturity quiz. &body=Don\'t worry,'+
			 'your response will be kept totally anonymous and they will only see an average of multiple scores. Don\'t keep them waiting! Click this link to rate your friend now.\"';
			 send.submit();
		 };
		 $scope.checkEmail = function(){
			 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email3) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email1) &&
			 /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.email2))
			 {
				 return false;
			 }
			 else {
				 return true;
			 }

	 };

 }]);
