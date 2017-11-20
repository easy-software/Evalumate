(function () {
  'use strict';

  describe('Ways2grows Route Tests', function () {
    // Initialize global variables
    var $scope,
      Ways2growsService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _Ways2growsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      Ways2growsService = _Ways2growsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('ways2grows');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/ways2grows');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          Ways2growsController,
          mockWays2grow;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('ways2grows.view');
          $templateCache.put('modules/ways2grows/client/views/view-ways2grow.client.view.html', '');

          // create mock Ways2grow
          mockWays2grow = new Ways2growsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ways2grow Name'
          });

          // Initialize Controller
          Ways2growsController = $controller('Ways2growsController as vm', {
            $scope: $scope,
            ways2growResolve: mockWays2grow
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:ways2growId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.ways2growResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            ways2growId: 1
          })).toEqual('/ways2grows/1');
        }));

        it('should attach an Ways2grow to the controller scope', function () {
          expect($scope.vm.ways2grow._id).toBe(mockWays2grow._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/ways2grows/client/views/view-ways2grow.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          Ways2growsController,
          mockWays2grow;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('ways2grows.create');
          $templateCache.put('modules/ways2grows/client/views/form-ways2grow.client.view.html', '');

          // create mock Ways2grow
          mockWays2grow = new Ways2growsService();

          // Initialize Controller
          Ways2growsController = $controller('Ways2growsController as vm', {
            $scope: $scope,
            ways2growResolve: mockWays2grow
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.ways2growResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/ways2grows/create');
        }));

        it('should attach an Ways2grow to the controller scope', function () {
          expect($scope.vm.ways2grow._id).toBe(mockWays2grow._id);
          expect($scope.vm.ways2grow._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/ways2grows/client/views/form-ways2grow.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          Ways2growsController,
          mockWays2grow;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('ways2grows.edit');
          $templateCache.put('modules/ways2grows/client/views/form-ways2grow.client.view.html', '');

          // create mock Ways2grow
          mockWays2grow = new Ways2growsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ways2grow Name'
          });

          // Initialize Controller
          Ways2growsController = $controller('Ways2growsController as vm', {
            $scope: $scope,
            ways2growResolve: mockWays2grow
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:ways2growId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.ways2growResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            ways2growId: 1
          })).toEqual('/ways2grows/1/edit');
        }));

        it('should attach an Ways2grow to the controller scope', function () {
          expect($scope.vm.ways2grow._id).toBe(mockWays2grow._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/ways2grows/client/views/form-ways2grow.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
