(function () {
    angular.module('chat', [
        'ui.router'
       // 'angular-storage'
    ]).config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];
    function config($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/chat/views/home.html'
            })
            .state('guest', {
                url: '/guest',
                templateUrl: '/chat/views/guest.html',
                controller: 'GuestCtrl as ctrl'
            })
            .state('service', {
                url: '/service',
                templateUrl: '/chat/views/service.html',
                controller: 'ServiceCtrl as ctrl'
            });

        $urlRouterProvider.otherwise('/');
    }
})();
