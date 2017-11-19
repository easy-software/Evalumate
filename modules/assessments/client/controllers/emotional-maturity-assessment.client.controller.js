(function () {
  'use strict';

  angular
    .module('assessments')
    .controller('AssessmentsListController', AssessmentsListController);

  AssessmentsListController.$inject = ['Authentication'];

  function AssessmentsListController(AssessmentsService,$scope, $state, $window, Authentication, assessment) {
    var vm = this;



    //vm.assessments = AssessmentsService.query();
    vm.findOne = findOne

    function findOne (){
        vm.assessment = 0
    }

    function done() {
			
      console.log("Submitted");



    }

    vm.ema=["This person is aware of and able to express accurately how he/she feels.",
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
