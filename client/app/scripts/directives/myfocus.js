'use strict';

angular.module('clientApp')
  .directive('myFocus', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        element[0].focus();
      }
    };
  });
