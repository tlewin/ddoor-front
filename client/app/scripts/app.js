'use strict';

angular.module('clientApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(['$locationProvider', '$routeProvider', '$httpProvider', function ($locationProvider, $routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    // $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        'responseError': function(response) {
          if(response.status === 401) {
            $location.path('/login');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    });
  }])
  .run(['$rootScope', '$location', 'Auth', function($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function() {
      // if(Auth.isLoggedIn()) {
      //   $location.path('/');
      // } else {
      //   $location.path('/login');
      // }
    });
  }]);