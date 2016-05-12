var app = angular.module('app',['ui.router','ngCookies','angularLocalStorage'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('contact', {
                url: '/contact/:id',
                templateUrl: 'contacts/contact.html',
                controller: 'ContactController',
                controllerAs:'cc'
            });

        $urlRouterProvider.otherwise('/contact/');
    });