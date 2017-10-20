(function () {
  'use strict';

  describe('Ways2grows Controller Tests', function () {
    // Initialize global variables
    var Ways2growsController,
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

      // create mock Ways2grow
      mockWays2grow = new Ways2growsService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Ways2grow Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Ways2grows controller.
      Ways2growsController = $controller('Ways2growsController as vm', {
        $scope: $scope,
        ways2growResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleWays2growPostData;

      beforeEach(function () {
        // Create a sample Ways2grow object
        sampleWays2growPostData = new Ways2growsService({
          name: 'Ways2grow Name'
        });

        $scope.vm.ways2grow = sampleWays2growPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Ways2growsService) {
        // Set POST response
        $httpBackend.expectPOST('api/ways2grows', sampleWays2growPostData).respond(mockWays2grow);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Ways2grow was created
        expect($state.go).toHaveBeenCalledWith('ways2grows.view', {
          ways2growId: mockWays2grow._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/ways2grows', sampleWays2growPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Ways2grow in $scope
        $scope.vm.ways2grow = mockWays2grow;
      });

      it('should update a valid Ways2grow', inject(function (Ways2growsService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/ways2grows\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('ways2grows.view', {
          ways2growId: mockWays2grow._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (Ways2growsService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/ways2grows\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Ways2grows
        $scope.vm.ways2grow = mockWays2grow;
      });

      it('should delete the Ways2grow and redirect to Ways2grows', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/ways2grows\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('ways2grows.list');
      });

      it('should should not delete the Ways2grow and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
