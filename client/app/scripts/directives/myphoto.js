'use strict';

angular.module('clientApp')
  .directive('myPhoto', function ($rootScope) {
    var
      // Find out getUserMedia implementation
      apiGetUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia,
      // Find out URL object  
      apiURL = window.URL || window.webkitURL;

    return {
      restrict: 'E',
      controller: function($scope) {
        $scope.startCamera = function() {
          console.log('camera starts!');
        };

        $scope.stopCamera = function() {
          console.log('camera stops!');
        };

        $scope.snapshot = function() {
          console.log('snapshot!');
        };

        this.isCameraEnable = function() {
          return apiGetUserMedia && apiURL;
        };
      },
      link: function(scope, element, attrs, photoCtrl) {
        // var
        //   video   = element.find('video'),
        //   canvas  = element.find('canvas');

        if(photoCtrl.isCameraEnable()) {
          scope.$emit('photo-fail');
        }
        console.log(element.find('video'));
      },
      templateUrl: 'views/myphoto.html'
    };
  });
