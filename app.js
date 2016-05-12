var app = angular.module('app',['ui.router','ngCookies','angularLocalStorage'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact/:id',
                templateUrl: 'contacts/contact.html',
                controller: 'ContactController',
                controllerAs:'cc'
            })
            .state('contacts', {
            url: '/contacts',
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController',
            controllerAs:'cc'

        });

        $urlRouterProvider.otherwise('/contacts');
    });