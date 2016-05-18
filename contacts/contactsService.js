app.service('contactsService', function (storage, $q) {

    this.getContacts = function () {
        return storage.get('contacts')
    }

    this.getContact = function (id) {
        var contacts = storage.get('contacts');
        return _.find(contacts, function (c) {
            return c.id === id;
        });

    }
    this.addContact = function (contact) {
        var contacts = storage.get('contacts', {defaultValue: []});
		if(!contacts)
			contacts = [];
        var existingContact = _.find(contacts, function (c) {
            return c.phoneNumber === contact.phoneNumber;
        });

        if (!existingContact) {
            contact.id = UUID.generate();
            contacts.push(contact);
            storage.set('contacts', contacts);
            return contact.id;
        }
    }

    this.editContact = function (contact) {
        var contacts = storage.get('contacts', {defaultValue: []});
        var existingContact = _.find(contacts, function (c) {
            return c.id === contact.id;
        })
        var existingContactWithSameNumnber = _.find(contacts, function (c) {
            return c.phoneNumber === contact.phoneNumber;
        });
        if (existingContactWithSameNumnber && existingContactWithSameNumnber.id !== contact.id) {
            return false;
        }
        else {
            contacts = _.reject(contacts, existingContact);
            contacts.push(contact);
            storage.set('contacts', contacts);
            return true;
        }
    }

    this.removeContact = function (id) {
        var contacts = storage.get('contacts', {defaultValue: []});
        contacts = _.filter(contacts, function (c) {
            return c.id !== id;
        });


        storage.set('contacts', contacts);
        return contacts;
    }

})