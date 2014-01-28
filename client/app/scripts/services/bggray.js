'use strict';

angular.module('clientApp')
  .service('Bggray', function Bggray() {
    var bgGrayFlag = false;
    
    return {
      test: function() {
        return 'xislo';
      },

      bgGray: function() {
        console.log('herex');
        return bgGrayFlag;
      },

      setBgGray: function(flag) {
        console.log('here');
        bgGrayFlag = flag;
      }
    };
  });
