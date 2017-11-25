(function () {
  'use strict';

  angular
    .module('assessments')
    .controller('emailController', emailController);

  emailController.$inject = ['$scope', '$window', '$stateParams', '$location', 'Authentication', 'AssessmentsService'];

	function emailController($scope, $window, $stateParams, $location, Authentication, AssessmentsService){
    // This provides Authentication context.
		 $scope.authentication = Authentication;
		 $scope.email1 = '';
		 $scope.email2 = '';
		 $scope.email3 = '';
		 $scope.emailstring = '';
		 $scope.assessments = AssessmentsService.query();
		 var send = document.getElementById('infoSubmit');
		 var reSend = document.getElementById('resend');

		 $scope.getEmail = function(){
			 $scope.emailstring = 'mailto:' + $scope.email1 + ',';
			 $scope.emailstring += $scope.email2 + ',';
			 $scope.emailstring += $scope.email3;
			 send.action = 'mailto:?bcc=' +$scope.email1 + ',' + $scope.email2 +',' + $scope.email3 +
			 	'&subject=You have been selected by a friend to participate in their LovED Assessment&body=Dear Friend, %0D%0A' +
			 	'%0D%0AI have selected you as one of my three trusted participants to anonymously evaluate my level of ' +
				'Emotional Maturity (EM). Using this really cool assessment as a tool gives me the honest feedback I need in' +
				'order to understand how I occur to others. I value your perspective and I know that the time it takes you to ' +
				 'complete this quiz will allow me to grow and become a better version of myself.%0D%0A' +
				 '%0D%0AWhen you have a few minutes, click on the link below and it’ll take you straight to the assessment. '+
				 'Don’t worry, it’s anonymous - so give me your honest feedback. \n Thank you for helping me with my personal growth '+
				 'journey. %0D%0A%0D%0A You are LovEd!'
			 send.submit();
 	 	};

		$scope.create = function (isValid) {
			 //console.log('HelloWorld')
			 $scope.error = null;

			 if (!isValid) {
				 $scope.$broadcast('show-errors-check-validity', 'assessmentForm');

				 return false;
			 }


			 // Create new Article object
			 var assess = new AssessmentsService({
				 email1: {
									 address: $scope.email1
				 },
				 email2: {
									 address: $scope.email2
				 },
				 email3: {
									 address: $scope.email3
				 }
				});


			 // Redirect after save
			 assess.$save(function (response) {
				 //$location.path('articles/' + response._id);

				 // Clear form fields
				 $scope.email1 = '';
				 $window.location.reload();
			 }, function (errorResponse) {
				 $scope.error = errorResponse.data.message;
			 });

			 };

			 $scope.update = function (isValid) {
	       $scope.error = null;

	       if (!isValid) {
	         $scope.$broadcast('show-errors-check-validity', 'articleForm');

	         return false;
	       }

	       var article = $scope.assessment;

				console.log(article)

				article.update($scope.assessments[0]._id)
					.then(function(response) {
						console.log("Email updated!");
					}, function(error) {
						//otherwise display the error
						$scope.error = 'Unable to update slot!\n' + error;
				});
			};

		 $scope.remEmail = function() {
		 	$scope.assessments.$promise.then(function(data) {
       //console.log(data[0].email1.address);
			 //data[0].email1.hasResponded = true;

			 console.log(data[0]._id);

			 if($scope.assessments.length > 0)
			 {
				 console.log('NOT EMPTY');
			 }
			 else
			 {
				 console.log('EMPTY');
			 }
			 if(data[0].email1.hasResponded==false)
			 {
			 	$scope.remEmail1 = data[0].email1.address;
		 	 } else {
			 	$scope.remEmail1 ='';
			 }

			 if(data[0].email2.hasResponded==false)
			 {
			 	$scope.remEmail2 = data[0].email2.address;
			 } else {
				 $scope.remEmail2 = '';
			 }

			 if(data[0].email3.hasResponded==false)
			 {
				 $scope.remEmail3 = data[0].email3.address;
			 } else {
					$scope.remEmail3='';
			 }



			 resend.action = 'mailto:?bcc=' + $scope.remEmail1 + ',' + $scope.remEmail2 +',' + $scope.remEmail3;
			 reSend.submit();
   		});
 		};



		 $scope.checkEmail = function(){
			 // if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.assessment.email1.address) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.assessment.email1.address) &&
			 // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.assessment.email3.address))
			 // {
				//  return false;
			 // }
			 // else {
				 return false;
			 //}
		};
		$scope.findOne = function () {
			$scope.assessment = AssessmentsService.get({
				assessmentID: $stateParams.assessmentId
			});
		};
	}
}());
