'use strict';

angular.module('clientApp')
  .controller('MainCtrl', ['$scope', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);

angular.module('clientApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
    // Setup the background before start
    $rootScope.isGrayBg = true;
    
    $scope.errorMessage = '';
    $scope.username = '';
    $scope.password = '';

    $scope.login = function() {
      Auth.login($scope.username, $scope.password)
      .success(function(data) {
        if(data.status === 'ok') {
          $location.path('/');
        } else {
          $scope.username = '';
          $scope.password = '';
          $scope.errorMessage = 'Login inválido!';
        }
      })
      .error(function() {
        $scope.errorMessage = 'Erro ao conectar. Por favor, tente novamente.';
      });
    };

    // Clean the background before exit
    $scope.$on('$locationChangeSuccess', function() {
      $rootScope.isGrayBg = false;
    });
  }]);

// angular.module('clientApp')
//   .controller('ClientCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
