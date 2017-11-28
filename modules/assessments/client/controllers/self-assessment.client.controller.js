(function () {
  'use strict';

  angular
    .module('assessments')
    .controller('selfAssessmentController', selfAssessmentController);

  selfAssessmentController.$inject = ['AssessmentsService','Authentication','$stateParams'];

  function selfAssessmentController(AssessmentsService, $stateParams, $routeParams ) {
    var vm = this;

    vm.submit = false;
    vm.results = [];
    vm.totalClicks =0;
    vm.name = null;
		vm.url = window.location.href;
    vm.assessment_= AssessmentsService.query();

    vm.init = function (){

    };
		var start = 0;
		var stop = 0;
		var count = 0;
		for(var i = 0; i < vm.url.length; i++)
		{
			if(vm.url.charAt(i) == '/')
			{
				count++;
				if(count == 3)
				{
					start = i;
					start++;

				}
				else if(count == 4)
				{
					stop = i;
					break;
				}
			}

		}
		vm.newId = vm.url.substring(start, stop);
		vm.assessment = AssessmentsService.get({
			assessmentId: vm.newId
		});
    vm.convertDate = function(Date_){
        //2017-11-26T01:08:22.360Z
        return Date_.substr(5,2)+'/'+Date_.substr(8,2)+'/'+Date_.substr(2,2);
    }


    //listens to changes on radio button
    vm.change = function (value) {
        vm.totalClicks =0;

        for (var i =0 ; i <vm.results.length; i++) {

            if(vm.results[i]!=null){
                vm.totalClicks+=1;
            }
        }
        if ((vm.totalClicks >2) && (vm.name != null)){
            vm.submit = true;
        }
    };
    //listens to changes on name field
    vm.change_ = function () {
        if ((vm.totalClicks > 5) && ((vm.name != null) || (vm.name != ""))) {
            vm.submit = true;
        }
    };

    vm.done = function (){
        var sum =0;
        for (var i =0 ;  i<vm.results.length;i++){
            if(vm.results[i]!=null){
                sum += vm.results[i];
            }

        }
        console.log({name: vm.name, result: sum});
        vm.userEMAs.push( {name: vm.name, result: sum});
    };

    vm.save = function() {
     var sum =0;
        for (var i =0 ;  i<vm.results.length;i++){
            if(vm.results[i]!=null){
                sum += vm.results[i];
            }
        }

						//console.log(vm.assessment);
						var assessment = vm.assessment;
						if (vm.name == vm.assessment.email1.address) {
							if(vm.assessment.email1.hasResponded == true)
							{
								alert("You've already rated this person");
							}
							else {
								vm.assessment.email1.score = sum;
								vm.assessment.email1.hasResponded = true;
								var assessment = vm.assessment;
								console.log(vm.assessment);
								assessment.$update();
							}
						}
						else if(vm.name == vm.assessment.email2.address)
						{
							if(vm.assessment.email2.hasResponded == true)
							{
								alert("You've already rated this person");
							}
							else {
								vm.assessment.email2.score = sum;
								vm.assessment.email2.hasResponded = true;
								var assessment = vm.assessment;
			          assessment.$update();
							}
						}
						else if(vm.name == vm.assessment.email3.address){
							if(vm.assessment.email3.hasResponded == true)
							{
								alert("You've already rated this person");
							}
							else {
								vm.assessment.email3.score = sum;
								vm.assessment.email3.hasResponded = true;
								var assessment = vm.assessment;
			          assessment.$update();
							}
						}



            else {
                alert("Please make sure your email address is spelled correctly")
            }



    }

    vm.find = function () {
            //vm.assess = AssessmentsService.query();
        };

    vm.id = ''



    // console.log(vm.id)
		//var vm.assessment;
    vm.findOne = function () {
			// vm.assessment = AssessmentsService.get({
      //   assessmentId: vm.$stateParams.assessmentId
      // });

    };


    vm.sa=["This person is aware of and able to express accurately how he/she feels.",
            "This person demonstrates sensitivity to how others are feeling.",
            "This person is willing and able to disclose personal feelings.",
            "This person accepts the fact that he/she has mixed feelings and is able to deal with these mixed feelings effectively.",
            "This person meets his/her personal desires and needs in constructive ways.",
            "This person readily accepts responsibility for failure when he/she has caused the failure.",
            "This person deals constructively with feelings of frustration.",
            "This person shows warm personal interest in other people.",
            "This person tries to make other people feel good and avoids making them feel bad.",
            "This person is easily able to resist negative peer pressure.",
            "This person complains in ways that are supportive of others.",
            "This person uses peaceful methods for resolving conflicts.",
            "This person is accepting of people despite disappointments and disagreements.",
            "This person is courteous to members of the opposite sex.",
            "This person makes plans and then follows through.",
            "This person can look after him/herself quite well.",
            "This person eagerly takes on new challenges.",
            "This person interacts in responsible ways.",
            "This person has high standards of performance for his/her work.",
            "This person cooperates well in working with other people.",
            "This person is open and receptive to new and better ways of doing things.",
            "This person has strong personal interests and invests time and effort into those interests.",
            "This person is truthful and sincere.",
            "This person has a good attitude when it comes to dealing with unpleasantness, pain, or discomfort.",
            "This person finishes what is started.",
            "This person is fair in his/her dealings with other people.",
            "This person keeps commitments.",
            "This person accepts responsibility for his/her own misconduct.",
            "This person is respectful of other peoples property and belongings.",
            "This person willingly carries his/her own share of the workload."
    ];


  }
}());
