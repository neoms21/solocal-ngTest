'use strict';

describe('contacts controller tests', function () {
    var storage, scope, vm, mockContactsService, stateParams;

    beforeEach(function () {
        mockContactsService = {

            getContacts: function () {

            },
            editContact: function () {

            },
            addContact: function () {

            },
            removeContact: function () {

            }
        };

        module('app', function ($provide) {
            $provide.value('contactsService', mockContactsService);
        });
    });

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            storage = $injector.get('storage');
        });
    });

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('ContactsController as cc', {$scope: scope, storage: storage});
        vm = scope.cc;
        scope.$digest();
    }));

    describe("list contacts page is invoked", function () {

        var goCalled = false, parameters;

        beforeEach(inject(function ($rootScope, $controller, _contactsService_, $state) {
            mockContactsService = _contactsService_;
            // // create a new $scope for each test
            scope = $rootScope.$new();

            spyOn($state, 'go').and.callFake(function (state, params) {
                goCalled = true;
                parameters = params
                // This replaces the 'go' functionality for the duration of your test
            });
            spyOn(mockContactsService, 'getContacts').and.returnValue([{
                firstName: 'M',
                lastName: 'P',
                phoneNumber: '222'
            }]);
            stateParams = {id: undefined};

            // use the new $scope in creating the controller
            $controller("ContactsController as cc", {
                $scope: scope,
                contactsService: mockContactsService,
                $stateParams: stateParams
            });
            vm = scope.cc;
        }));

        it("should display the add contact when url id is blank", function () {

            expect(vm).toBeDefined();
            expect(vm.contacts.length).toBe(1);
            expect(mockContactsService.getContacts).toHaveBeenCalled();
        });

        it("should call remove contact from service when invoked", function () {
            spyOn(mockContactsService, 'removeContact').and.returnValue();
            vm.remove({id: '123'})
            expect(mockContactsService.removeContact).toHaveBeenCalledWith('123');
        });

        it("should navigate to contact page with id undefined", function () {
            vm.navigate();
            expect(goCalled).toBe(true);
            expect(parameters.id).toBeUndefined();
        });

        it("should navigate to contact page with id defined", function () {
            spyOn(mockContactsService, 'addContact').and.returnValue();
            vm.navigate('4');
            expect(goCalled).toBe(true);
            expect(parameters.id).toBe('4');
        });
    });
});