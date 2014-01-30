'use strict';

angular.module('clientApp')
  .service('Bggray', function Bggray() {
    var bgGrayFlag = false;
    
    return {
      test: function() {
        return 'xislo';
      },

      bgGray: function() {
        return bgGrayFlag;
      },

      setBgGray: function(flag) {
        bgGrayFlag = flag;
      }
    };
  });
