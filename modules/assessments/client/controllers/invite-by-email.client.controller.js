(function () {
  'use strict';
//connects controller to form-assessment page and assessments collection in db
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
		 $scope.date = '';
		 $scope.numResponses = 0;
		 $scope.emailstring = '';
		 $scope.assessments = AssessmentsService.query();
		 		$scope.assessments.$promise.then(function(data) {
					if(data.length>0){
						$scope.urlId = data[0]._id;
					}

		 });
		 //console.log('UrlId: ' $scope.urlId);
		 var send = document.getElementById('infoSubmit');
		 var reSend = document.getElementById('resend');

		 //Send email button calls this function
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
				 '%0D%0AWhen you have a few minutes, click on the link below and it’ll take you straight to the assessment. %0D%0A%0D%0A'+
				 'http://evalumate.herokuapp.com/'+ $scope.urlId +'/Self-Assessment'+
				 '%0D%0A%0D%0ADon’t worry, it’s anonymous - so give me your honest feedback. %0D%0A%0D%0A Thank you for '+
				 'helping me with my personal growth '+
				 'journey. %0D%0A%0D%0A You are LovEd!'
			 send.submit();
 	 	};
		//send email also calls this function
		$scope.create = function (isValid) {
			 //console.log('HelloWorld')
			 $scope.error = null;

			 if (!isValid) {
				 $scope.$broadcast('show-errors-check-validity', 'assessmentForm');

				 return false;
			 }
			 //if the user already has a collection in the db, update
			 if($scope.assessments.length>0)
			 {
				 $scope.assessment.email1.hasResponded = false;
				 $scope.assessment.email1.score = 0;
				 $scope.assessment.email2.hasResponded = false;
				 $scope.assessment.email2.score = 0;
				 $scope.assessment.email3.hasResponded = false;
				 $scope.assessment.email3.score = 0;

				 //the following few lines get the date and add it to be saved to the db
				 var today = new Date();
				 var dd = today.getDate();
				 var mm = today.getMonth()+1; //January is 0!
				 var yyyy = today.getFullYear();
				 if(dd<10) {
				 	dd = '0'+dd
				 }

				 if(mm<10) {
					   mm = '0'+mm
					}

				 today = mm + '/' + dd + '/' + yyyy;
				 $scope.assessment.dateSent = today;
				 var article = $scope.assessment;

					console.log(article)


	       article.$update(function () {
	         $location.path('/assessments/create');
					 $window.location.reload();
	       }, function (errorResponse) {
	         $scope.error = errorResponse.data.message;
	       });
			 }
			 //if not then make one
			 else{
				 var today = new Date();
				 var dd = today.getDate();
				 var mm = today.getMonth()+1; //January is 0!
				 var yyyy = today.getFullYear();
				 if(dd<10) {
				 	dd = '0'+dd
				 }

				 if(mm<10) {
					   mm = '0'+mm
					}

				 today = mm + '/' + dd + '/' + yyyy;
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
					 },
					 dateSent: today
				 });


				 // Redirect after save
				 assess.$save(function () {
	         $location.path('/assessments/create');
					 $window.location.reload();
	       }, function (errorResponse) {
	         $scope.error = errorResponse.data.message;
	       });
		 		}
			 };

			 //reminder email button calls this function
		 $scope.remEmail = function() {
		 	$scope.assessments.$promise.then(function(data) {
       //check to see who hasnt responded
			 if(data[0].email1.hasResponded == false)
			 {
				 $scope.remEmail1 = data[0].email1.address;
			 } else {
				 $scope.remEmail1 = '';
			 }
			 if(data[0].email2.hasResponded == false)
			 {
				 $scope.remEmail2 = data[0].email2.address;
			 } else {
				 $scope.remEmail2 = '';
			 }
			 if(data[0].email3.hasResponded == false)
			 {
				 $scope.remEmail3 = data[0].email3.address;
			 } else {
				 $scope.remEmail3 = '';
			 }
			 //if everyone has responded, alert user
			 if(data[0].email1.hasResponded == true && data[0].email2.hasResponded == true && data[0].email3.hasResponded == true)
			 {
				 alert('All three friends have responded, please navigate to the view your scores page or invtie 3 new friends to rate you.')
			 }
			 //otherwise send email to people that haven't answered yet
			 else {
				 	resend.action = send.action = 'mailto:?bcc=' +$scope.remEmail1 + ',' + $scope.remEmail2 +',' + $scope.remEmail3 +
				 	'&subject=Friendly Reminder: Your Friend is Waiting for Your Feedback.'+
					'&body=Dear Friend, %0D%0A' +
				 	'%0D%0AJust to remind you that you have been selected you as one of my three trusted participants to ' +
					'anonymously evaluate my level of Emotional Maturity (EM).%0D%0A' +
					'%0D%0AI’d really appreciate it if you took a few minutes to click on the link below and '+
					'complete my assessment.%0D%0A%0D%0A' +
					'http://evalumate.herokuapp.com/'+ $scope.urlId +'/Self-Assessment' +
					'%0D%0A%0D%0AAgain, this is an anonymous questionnaire, so thank you for your honest feedback.%0D%0A' +
					'%0D%0AYour support is greatly appreciated.%0D%0A' +
					'%0D%0AYou are LovEd! '
				 	reSend.submit();
		 		}
				if($scope.assessments.length>0)
	 			 {
					 //change day of email last sent when reminder email is sent
	 				 var today = new Date();
	 				 var dd = today.getDate();
	 				 var mm = today.getMonth()+1; //January is 0!
	 				 var yyyy = today.getFullYear();
	 				 if(dd<10) {
	 				 	dd = '0'+dd
	 				 }

	 				 if(mm<10) {
	 					   mm = '0'+mm
	 					}

	 				 today = mm + '/' + dd + '/' + yyyy;
	 				 $scope.assessment.dateSent = today;
	 				 var article = $scope.assessment;

	 					console.log(article)


	 	       article.$update(function () {
	 	         $location.path('/assessments/create');
	 					 $window.location.reload();
	 	       }, function (errorResponse) {
	 	         $scope.error = errorResponse.data.message;
	 	       });
 			 	}
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
			$scope.msg = 'It looks like you haven\'t invited any  friends to rate your emotional maturity yet.';
			if(data.length>0){
			$scope.id = data[0]._id;
			$scope.assessment = AssessmentsService.get({
				assessmentId: $scope.id
			});
			if(data[0].dateSent != ''){
				$scope.date = data[0].dateSent;
				if(data[0].email1.hasResponded == true)
				{
					$scope.numResponses++;
				}
				if(data[0].email2.hasResponded == true)
				{
					$scope.numResponses++;
				}
				if(data[0].email3.hasResponded == true)
				{
					$scope.numResponses++;
				}
				if($scope.numResponses == 2  || $scope.numResponses == 0){
				$scope.msg = 'The last time you sent an email was on ' + $scope.date +
										 ', as of right now, ' + $scope.numResponses + ' friends have responded!';
				}
				else if($scope.numResponses == 1)
				{
					$scope.msg = 'The last time you sent an email was on ' + $scope.date +
											 ', as of right now, ' + $scope.numResponses + ' friend has responded!';
				}
				else if($scope.numResponses == 3){
					$scope.msg = 'Congratulations, all 3 of your friends have replied! Navigate to the EMQ' +
					' landing page to view your scores, or invite 3 more friends to get another Self-assessment score!';
				}
				else
				{
					$scope.msg = 'It looks like you haven\'t invited any  friends to rate your emotional maturity yet.';
				}
			}
			else
			{
				$scope.msg = 'It looks like you haven\'t invited any  friends to rate your emotional maturity yet.';
			}

		}
		});

		console.log($scope.id)
		$scope.findOne = function () {

		};
	}
}());
