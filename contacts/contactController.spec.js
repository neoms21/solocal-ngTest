'use strict';

describe('contact controller tests', function () {
    var storage, scope, vm, mockContactsService, stateParams;

    beforeEach(function () {
        mockContactsService = {

            getContact :function () {

            },
            addContact: function () {

            },
            editContact: function () {
                
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
        $controller('ContactController as cc', {$scope: scope, storage: storage});
        vm = scope.cc;
        scope.$digest();
    }));

    describe("when add contact is invoked", function () {

        beforeEach(inject(function ($rootScope, $controller, _contactsService_, $state) {
            mockContactsService = _contactsService_;
            // // create a new $scope for each test
            scope = $rootScope.$new();

            spyOn($state, 'go').and.callFake(function (state, params) {
                // This replaces the 'go' functionality for the duration of your test
            });

            stateParams = {id: undefined};

            // use the new $scope in creating the controller
            $controller("ContactController as cc", {
                $scope: scope,
                contactsService: mockContactsService,
                $stateParams: stateParams
            });
            vm = scope.cc;
        }));

        it("should display the add contact when url id is blank", function () {
            vm.$stateParams = stateParams;
            expect(vm).toBeDefined();
        });

        it("should call addContact method from service with contact passed in when saved", function () {
            spyOn(mockContactsService, 'addContact').and.returnValue('x090');
            vm.contact = {firstName: 'First', lastName: 'Last', phoneNumber: '12434'};
            vm.save();
            expect(mockContactsService.addContact).toHaveBeenCalledWith(vm.contact);
            expect(vm.contact.id).toBe('x090');
        });
    });


    describe('when phone number is entered', function () {

        it('should invalidate the number if entered incorrectly', function () {
            vm.contact = {firstName: 'M', lastName: 'S', phoneNumber: '1234'};
            var isValid = vm.isValidNumber(vm.contact.phoneNumber)
            expect(isValid).toBe(false);

        });

        it('should validate the number if entered correctly', function () {
            vm.contact = {firstName: 'M', lastName: 'S', phoneNumber: '07827930063'};
            var isValid = vm.isValidNumber(vm.contact.phoneNumber)
            expect(isValid).toBe(true);

        });
    });

    describe("when edit contact is invoked", function () {
        var contact;

        beforeEach(inject(function ($rootScope, $controller, _contactsService_, $state) {
            mockContactsService = _contactsService_;
            scope = $rootScope.$new();

            spyOn($state, 'go').and.callFake(function (state, params) {
                // This replaces the 'go' functionality for the duration of your test
            });
            contact = {firstName: 'Manoj', lastName: 'Sethi', phoneNumber: '111', id: '1234'};
            spyOn(mockContactsService, 'getContact').and.returnValue(contact);
            stateParams = {id: '1234'};

            // use the new $scope in creating the controller
            $controller("ContactController as cc", {
                $scope: scope,
                contactsService: mockContactsService,
                $stateParams: stateParams
            });
            vm = scope.cc;
        }));

        it("should display the contact from service when id is not blank", function () {
            vm.$stateParams = stateParams;
            expect(vm).toBeDefined();
            expect(mockContactsService.getContact).toHaveBeenCalledWith('1234');
            expect(vm.contact.firstName).toBe('Manoj');
            expect(vm.contact.lastName).toBe('Sethi');
            expect(vm.contact.phoneNumber).toBe('111');
            expect(vm.contact.id).toBe('1234');
        });

        it("should call editContact method from service with contact passed in when saved", function () {
            spyOn(mockContactsService, 'editContact').and.returnValue('1234');
            vm.save();
            expect(mockContactsService.editContact).toHaveBeenCalledWith(vm.contact);
            expect(vm.contact.id).toBe('1234');
        });
    });

});