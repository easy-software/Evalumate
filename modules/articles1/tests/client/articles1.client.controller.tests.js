'use strict';

(function () {
  // Articles Controller Spec
  describe('Articles1 Controller Tests', function () {
    // Initialize global variables
    var Articles1Controller,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Articles1,
      mockArticle1;

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
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Articles1_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Articles1 = _Articles1_;

      // create mock article
      mockArticle1 = new Articles1({
        _id: '525a8422f6d0f87f0e407a33',
        title: 'An Article1 about MEAN',
        content: 'MEAN rocks!'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Articles controller.
      Articles1Controller = $controller('Articles1Controller', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one article1 object fetched from XHR', inject(function (Articles1) {
      // Create a sample articles array that includes the new article
      var sampleArticles1 = [mockArticle1];

      // Set GET response
      $httpBackend.expectGET('api/articles1').respond(sampleArticles1);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.articles1).toEqualData(sampleArticles1);
    }));

    it('$scope.findOne() should create an array with one article1 object fetched from XHR using a article1Id URL parameter', inject(function (Articles1) {
      // Set the URL parameter
      $stateParams.article1Id = mockArticle1._id;

      // Set GET response
      $httpBackend.expectGET(/api\/articles1\/([0-9a-fA-F]{24})$/).respond(mockArticle1);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.article1).toEqualData(mockArticle1);
    }));

    describe('$scope.create()', function () {
      var sampleArticle1PostData;

      beforeEach(function () {
        // Create a sample article object
        sampleArticle1PostData = new Articles1({
          title: 'An Article1 about MEAN',
          content: 'MEAN rocks!'
        });

        // Fixture mock form input values
        scope.title = 'An Article1 about MEAN';
        scope.content = 'MEAN rocks!';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Articles1) {
        // Set POST response
        $httpBackend.expectPOST('api/articles1', sampleArticle1PostData).respond(mockArticle1);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the article was created
        expect($location.path.calls.mostRecent().args[0]).toBe('articles1/' + mockArticle1._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/articles1', sampleArticle1PostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock article in scope
        scope.article1 = mockArticle1;
      });

      it('should update a valid article1', inject(function (Articles1) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/articles1\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/articles1/' + mockArticle1._id);
      }));

      it('should set scope.error to error response message', inject(function (Articles1) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/articles1\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(article1)', function () {
      beforeEach(function () {
        // Create new articles array and include the article
        scope.articles1 = [mockArticle1, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/articles1\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockArticle1);
      });

      it('should send a DELETE request with a valid article1Id and remove the article1 from the scope', inject(function (Articles1) {
        expect(scope.articles1.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.article1 = mockArticle1;

        $httpBackend.expectDELETE(/api\/articles1\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to articles1', function () {
        expect($location.path).toHaveBeenCalledWith('articles1');
      });
    });
  });
}());
