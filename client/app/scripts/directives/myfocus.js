'use strict';

angular.module('clientApp')
  .directive('myFocus', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element[0].focus();
      }
    };
  });
