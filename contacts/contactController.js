app.controller('ContactController', function (contactsService, $state, $stateParams) {
    var cc = this;

    cc.isValidNumber = function (num) {
        if (!num)
            return true;

        var pattern = /^(\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;
        var regex = new RegExp(pattern);

        return regex.test(num);
    };

    cc.save = function () {
        var result = contactsService.addContact(cc.contact);

        if (result) {
            cc.contact.id = result;
        }
    }
});