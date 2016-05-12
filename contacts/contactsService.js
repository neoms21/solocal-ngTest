app.service('contactsService', function (storage, $q) {


    this.addContact = function (contact) {
        var contacts = storage.get('contacts', {defaultValue: []});

        var existingContact = _.find(contacts, function (c) {
            return c.phoneNumber === contact.phoneNumber;
        });

        if (!existingContact) {
            contact.id = UUID.generate();
            contacts.push(contact);
            storage.set('contacts', contacts);
            console.log(storage.get('contacts'));
            return contact.id;
        }
    }
})