(function () {
  'use strict';

  describe('Ways2grows List Controller Tests', function () {
    // Initialize global variables
    var Ways2growsListController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      Ways2growsService,
      mockWays2grow;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _Ways2growsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      Ways2growsService = _Ways2growsService_;

      // create mock article
      mockWays2grow = new Ways2growsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Ways2grow Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ways2grows List controller.
      Ways2growsListController = $controller('Ways2growsListController as vm', {
        $scope: $scope
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('Instantiate', function () {
      var mockWays2growList;

      beforeEach(function () {
        mockWays2growList = [mockWays2grow, mockWays2grow];
      });

      it('should send a GET request and return all Ways2grows', inject(function (Ways2growsService) {
        // Set POST response
        $httpBackend.expectGET('api/ways2grows').respond(mockWays2growList);


        $httpBackend.flush();

        // Test form inputs are reset
        expect($scope.vm.ways2grows.length).toEqual(2);
        expect($scope.vm.ways2grows[0]).toEqual(mockWays2grow);
        expect($scope.vm.ways2grows[1]).toEqual(mockWays2grow);

      }));
    });
  });
}());
