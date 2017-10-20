(function () {
  'use strict';

  describe('Emas Route Tests', function () {
    // Initialize global variables
    var $scope,
      EmasService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _EmasService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      EmasService = _EmasService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('emas');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/emas');
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
          EmasController,
          mockEma;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('emas.view');
          $templateCache.put('modules/emas/client/views/view-ema.client.view.html', '');

          // create mock Ema
          mockEma = new EmasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ema Name'
          });

          // Initialize Controller
          EmasController = $controller('EmasController as vm', {
            $scope: $scope,
            emaResolve: mockEma
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:emaId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.emaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            emaId: 1
          })).toEqual('/emas/1');
        }));

        it('should attach an Ema to the controller scope', function () {
          expect($scope.vm.ema._id).toBe(mockEma._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/emas/client/views/view-ema.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          EmasController,
          mockEma;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('emas.create');
          $templateCache.put('modules/emas/client/views/form-ema.client.view.html', '');

          // create mock Ema
          mockEma = new EmasService();

          // Initialize Controller
          EmasController = $controller('EmasController as vm', {
            $scope: $scope,
            emaResolve: mockEma
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.emaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/emas/create');
        }));

        it('should attach an Ema to the controller scope', function () {
          expect($scope.vm.ema._id).toBe(mockEma._id);
          expect($scope.vm.ema._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/emas/client/views/form-ema.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          EmasController,
          mockEma;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('emas.edit');
          $templateCache.put('modules/emas/client/views/form-ema.client.view.html', '');

          // create mock Ema
          mockEma = new EmasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Ema Name'
          });

          // Initialize Controller
          EmasController = $controller('EmasController as vm', {
            $scope: $scope,
            emaResolve: mockEma
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:emaId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.emaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            emaId: 1
          })).toEqual('/emas/1/edit');
        }));

        it('should attach an Ema to the controller scope', function () {
          expect($scope.vm.ema._id).toBe(mockEma._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/emas/client/views/form-ema.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
