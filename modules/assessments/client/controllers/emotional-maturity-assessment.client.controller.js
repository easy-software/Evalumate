(function () {
  'use strict';

  angular
    .module('assessments')
    .controller('AssessmentsListController', AssessmentsListController);

  AssessmentsListController.$inject = ['AssessmentsService','Authentication'];

  function AssessmentsListController(AssessmentsService) {
    var vm = this;

    vm.submit = false;
    vm.results = [];
    vm.totalClicks =0;
    vm.name = null;
    vm.assessment_= AssessmentsService.query();


    vm.init = function (){
        if (vm.page=="EMA"){
                vm.len ==  30
        }
            else if (vm.page=="RAA"){
                vm.len ==  29
            }
        vm.assessment_= AssessmentsService.query();
    }

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
        if ((vm.totalClicks == vm.len) && (vm.name != null)){
            vm.submit = true;
        }
    };
    //listens to changes on name field
    vm.change_ = function () {
         if (vm.page=="EMA"){
                vm.len ==  30;
        }
            else if (vm.page=="RAA"){
                vm.len ==  29;
            }
        if ((vm.totalClicks == vm.len) && ((vm.name != null) || ( /^\S+$/.test(vm.name)  ))) {
            return true;
        } 
        else
            return false;
    };

    vm.done = function (){
        var sum =0;
        for (var i =0 ;  i<vm.results.length;i++){
            if(vm.results[i]!=null){
                sum += vm.results[i];
            }

        }
        vm.userEMAs.push( {name: vm.name, result: sum});
    };

    vm.save = function() {
     var sum =0;
        for (var i =0 ;  i<vm.results.length;i++){
            if(vm.results[i]!=null){
                sum += vm.results[i];
            }
        }


      if (vm.assessment_.length > 0) {
            if (vm.page=="EMA"){
                vm.assessment.emaresult.push({name: vm.name, score: sum});
            }
            else if (vm.page=="RAA"){
                vm.assessment.raaresult.push({name: vm.name, score: sum});
            }


            var assessment = vm.assessment;
            assessment.$update();

      } else {

            var assessment = new AssessmentsService();

            if (vm.page=="EMA"){
                assessment.emaresult = [{name: vm.name, score: sum}];
            }
            else if (vm.page=="RAA"){
                assessment.raaresult = [{name: vm.name, score: sum}];
            }


            vm.assessment = assessment;
            assessment.$save();

      }

    }

    vm.find = function () {
            AssessmentsService.query().$promise.then(function(data) {
							//if(data[0].email1.hasResponded == true && data[0].email2.hasResponded == true && data[0].email1.hasResponded == true)
						});
        };

    vm.id = ''
    AssessmentsService.query().$promise.then(function(data) {
        if (data.length > 0){
            vm.id = data[0]._id;
            vm.assessment = AssessmentsService.get({
            assessmentId: vm.id
            });
        }
    });


    vm.findOne = function () {

    };


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
