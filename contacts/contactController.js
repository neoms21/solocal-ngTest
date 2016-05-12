app.controller('ContactController', function (contactsService, $state, $stateParams) {
    var cc = this;

    var id = $stateParams.id;

    if (id && id !== '') {
        cc.contact = contactsService.getContact(id);
    }

    cc.isValidNumber = function (num) {
        if (!num)
            return true;

        var pattern = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
        var regex = new RegExp(pattern);

        return regex.test(num);
    };

    cc.save = function () {
        var result = cc.contact.id ? contactsService.editContact(cc.contact) : contactsService.addContact(cc.contact);

        if (result) {
            cc.contact.id = result;
            $state.go('contacts');
        }
        else{
            notie.alert(3, 'Save Failed!!. Number already exists', 2);
        }
    }
});