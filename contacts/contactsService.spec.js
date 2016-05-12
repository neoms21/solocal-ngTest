'use strict';

describe('contacts service tests', function () {
    var contactsService, scope, storage;

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            storage = $injector.get('storage');
        });
    });

    beforeEach(inject(function ($rootScope, _contactsService_) {

        contactsService = _contactsService_;

    }));
    beforeEach(function () {
        storage.set('contacts', [{
            firstName: 'FirstName',
            lastName: 'LastName',
            phoneNumber: '1234',
            id: 'X129'
        }]);
    });
    describe('service requests are made for add, get and remove', function () {

        it('should return the contacts from storage', function () {
            var contacts = contactsService.getContacts();
            expect(contacts.length).toBe(1);
        });

        it('should return the contact from id', function () {
            var contact = contactsService.getContact('X129');
            expect(contact.firstName).toBe('FirstName');
            expect(contact.lastName).toBe('LastName');
            expect(contact.phoneNumber).toBe('1234');
        });

        it('should add the contact in storage', function () {
            var id = contactsService.addContact({firstName: 'Alex', lastName: 'Bedene', phoneNumber: '33333'});
            var contacts = contactsService.getContacts();
            expect(contacts.length).toBe(2);
            var contact = contactsService.getContact(id);
            expect(contact.firstName).toBe('Alex');
            expect(contact.lastName).toBe('Bedene');
            expect(contact.phoneNumber).toBe('33333');
        });

        it('should remove the contact from storage', function () {
            contactsService.removeContact('X129');
            var contacts = contactsService.getContacts();
            expect(contacts.length).toBe(0);
            var contact = contactsService.getContact('X129');
            expect(contact).toBeUndefined();
        });


    });

    
    describe('when service requests are made for editing the contact', function () {

        it('should edit the passed contact and replace it in storage', function () {
            var editedContact = {
                firstName: 'FirstName',
                lastName: 'LastNameModified',
                phoneNumber: '1234',
                id: 'X129'
            };

            contactsService.editContact(editedContact);

            var contacts = contactsService.getContacts();
            expect(contacts.length).toBe(1);
            var contact = contactsService.getContact('X129');
            expect(contact.firstName).toBe('FirstName');
            expect(contact.lastName).toBe('LastNameModified');
            expect(contact.phoneNumber).toBe('1234');
        });

        it('should not edit the contact if edited contact has previously existing number', function () {


            var newContact = {
                firstName: 'Second',
                lastName: 'Second Last',
                phoneNumber: '2563',
            };

            contactsService.addContact(newContact);

            var editedContact = {
                firstName: 'FirstName',
                lastName: 'LastName',
                phoneNumber: '2563',
                id: 'X129'
            };

            var result = contactsService.editContact(editedContact);
            expect(result).toBe(false);
            var contacts = contactsService.getContacts();

            expect(contacts.length).toBe(2);
            var contact = contactsService.getContact('X129');
            expect(contact.firstName).toBe('FirstName');
            expect(contact.lastName).toBe('LastName');
            expect(contact.phoneNumber).toBe('1234');
        });
    })


});