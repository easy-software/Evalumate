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
		 		$scope.assessments.$promise.then(function(data) {
					$scope.urlId = data[0]._id;
		 });
		 //console.log('UrlId: ' $scope.urlId);
		 var send = document.getElementById('infoSubmit');
		 var reSend = document.getElementById('resend');
		 
		 $scope.getEmail = function(){
			 $scope.emailstring = 'mailto:' + $scope.assessment.email1.address + ',';
			 $scope.emailstring += $scope.assessment.email2.address + ',';
			 $scope.emailstring += $scope.assessment.email3.address;
			 send.action = 'mailto:?bcc=' +$scope.assessment.email1.address + ',' + $scope.assessment.email2.address +',' + $scope.assessment.email3.address +
			 	'&subject=You have been selected by a friend to participate in their LovED Assessment&body=Dear Friend, %0D%0A' +
			 	'%0D%0AI have selected you as one of my three trusted participants to anonymously evaluate my level of ' +
				'Emotional Maturity (EM). Using this really cool assessment as a tool gives me the honest feedback I need in' +
				'order to understand how I occur to others. I value your perspective and I know that the time it takes you to ' +
				 'complete this quiz will allow me to grow and become a better version of myself.%0D%0A' +
				 '%0D%0AWhen you have a few minutes, click on the link below and it’ll take you straight to the assessment. '+
				 'Don’t worry, it’s anonymous - so give me your honest feedback. %0D%0A%0D%0A Thank you for helping me with my personal growth '+
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

			 if($scope.assessments.length>0)
			 {
				 $scope.assessment.email1.hasResponded = false;
				 $scope.assessment.email1.score = 0;
				 $scope.assessment.email2.hasResponded = false;
				 $scope.assessment.email2.score = 0;
				 $scope.assessment.email3.hasResponded = false;
				 $scope.assessment.email3.score = 0;
				 var article = $scope.assessment;

					console.log(article)


	       article.$update();
			 }

			 else{
			 // Create new Article object
				 var assess = new AssessmentsService({
					 email1: {
										 address: $scope.assessment.email1.address
					 },
					 email2: {
										 address: $scope.assessment.email2.address
					 },
					 email3: {
										 address: $scope.assessment.email3.address
					 }
				 });


				 // Redirect after save
				 assess.$save(function (response) {
					 //$location.path('articles/' + response._id);

					 // Clear form fields
					 //$scope.email1 = '';
					 //$window.location.reload();
				 }, function (errorResponse) {
					 $scope.error = errorResponse.data.message;
				 });
		 		}
			 };

			 // $scope.update = function (isValid) {
	     //   $scope.error = null;
       //
	     //   if (!isValid) {
	     //     $scope.$broadcast('show-errors-check-validity', 'assessmentForm');
       //
	     //     return false;
	     //   }
       //
	     //   var article = $scope.assessment;
       //
				// 	console.log(article)
       //
	     //   article.$update(function () {
	     //     $location.path('assessments/create' + $scope.assessments._id);
	     //   }, function (errorResponse) {
	     //     $scope.error = errorResponse.data.message;
	     //   });
	     // };

		 $scope.remEmail = function() {
		 	$scope.assessments.$promise.then(function(data) {
       //console.log(data[0].email1.address);
			 //data[0].email1.hasResponded = true;
			 	$scope.remEmail1 = data[0].email1.address;
			 	$scope.remEmail2 = data[0].email2.address;
				$scope.remEmail3 = data[0].email3.address;
			 resend.action = send.action = 'mailto:?bcc=' +$scope.assessment.email1.address + ',' + $scope.assessment.email2.address +',' + $scope.assessment.email3.address +
			 	'&subject=Reminder: You have been selected by a friend to participate in their LovED Assessment&body=Dear Friend, %0D%0A' +
			 	'%0D%0AI have selected you as one of my three trusted participants to anonymously evaluate my level of ' +
				'Emotional Maturity (EM). Using this really cool assessment as a tool gives me the honest feedback I need in' +
				'order to understand how I occur to others. I value your perspective and I know that the time it takes you to ' +
				 'complete this quiz will allow me to grow and become a better version of myself.%0D%0A' +
				 '%0D%0AWhen you have a few minutes, click on the link below and it’ll take you straight to the assessment. '+
				 'Don’t worry, it’s anonymous - so give me your honest feedback. %0D%0A%0D%0A Thank you for helping me with my personal growth '+
				 'journey. %0D%0A%0D%0A You are LovEd! %0D%0A%0D%0A%0D%0A If you have already completed the assessment, please ignore this message'
			 reSend.submit();
   		});
 		};



		 $scope.checkEmail = function(){
			 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.assessment.email1.address) && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.assessment.email2.address) &&
			 /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($scope.assessment.email3.address))
			 {
				 return false;
			 }
			 else {
				 return true;
			 }
		};
		$scope.find = function () {
			$scope.assesss = AssessmentsService.query();
		};
		// $scope.findOne = function () {
		// 	console.log('hello');
		// 	$scope.assessment = AssessmentsService.get({
		// 			$scope.assessments.$promise.then(function(data) {
		// 				assessmentId: data[0]._id;
		// 			});
		// 	});
		// };
		$scope.id = ''
		$scope.assessments.$promise.then(function(data) {
			if(data.length>0){
			$scope.id = data[0]._id;
			$scope.assessment = AssessmentsService.get({
				assessmentId: $scope.id
			});
		}
		});

		console.log($scope.id)
		$scope.findOne = function () {

		};
	}
}());
