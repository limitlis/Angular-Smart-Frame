'use strict';

angular.module('angularIframed', ['ngSanitize', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('framed', {
        url: '/framed',
        templateUrl: 'app/main/framed.html',
        controller: 'FramedCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })
;
