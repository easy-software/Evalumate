angular.module('journal').controller('JournalsController', ['$scope','$stateProvider',
  function($scope) {

    //listings are all the listings I think
 $scope.detailedInfo = undefined;

    //listings are all the listings I think


    /*
      Implement these functions in the controller to make your application function
      as described in the assignment spec.
     */
     $scope.str ={
       title: 'hey'
     }
     $scope.listings = [
	  {

	    title: 'Test',
	    content: 'Lorem Ipsum'
	  },
	  {

	    title: 'Test2',
      content: 'TEst'

	  }
]

    $scope.addListing = function() {
      $scope.listings.unshift( $scope.x );

    	$scope.x='';



    };
    $scope.deleteListing = function(index) {
      $scope.listings.splice(index, 1);

    };

    $scope.showDetails = function(index) {
        $scope.detailedInfo = $scope.listings[index];
    };

  }
]);
