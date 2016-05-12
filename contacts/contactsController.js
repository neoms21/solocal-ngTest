app.controller('ContactsController', function ($state, contactsService) {

    var cc = this;
    cc.searchName='';
    cc.contacts = contactsService.getContacts();
    cc.navigate = function (num) {
        $state.go('contact', {id: num});
    };
});