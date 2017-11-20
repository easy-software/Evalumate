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
    vm.results = [];
    console.log(vm.results[0]);

    vm.raa=["Physical affection with this person is very special.",
            "I experience something special with this person that I do not experience with others.", 
            "I am curious about why and how much this person is interested in me.", 
            "I get excited when I meet this person unexpectedly.", 
            "I am willing to change in order to be more desirable to this person.", 
            "I have a longing for this person when we are apart.", 
            "Being with this person is more important to me than where we are or what we are doing.", 
            "I want to be very special in this person's life.", 
            "I see this person as a long term companion.", 
            "I am willing to continue this relationship in spite of any unpleasantness.", 
            "I am willing to do things for this person without having to know the reason why.", 
            "We often have a very good time even when we are not doing anything special.", 
            "I get a thrill from just looking at this person.", 
            "I enjoy this person in ways beyond just sharing affection.", 
            "There is something almost mystical in our eye-to-eye contact.", 
            "I could see myself growing old with this person.", 
            "This person is a beautiful person (inner beauty).", 
            "This person is often on my mind.", 
            "I would feel sad if this person became strongly interested in someone else.", 
            "I want our attraction to be mutual.", 
            "I experience unusual and pleasantly exciting feelings when I am with this person.", 
            "I want this person to respect me for my abilities.", 
            "I enjoy being with this person even when we are silent.", 
            "It means a lot to me when this person does something special for me.", 
            "I would like to know what this person finds attractive about me.", 
            "There are so many things I wish we could do together, if only there was enough time.", 
            "I have a protective interest about this person's well being.", 
            "I like doing things for this person.", 
            "I have thoughts of what our future together might look like." 
            ]

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
