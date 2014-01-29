'use strict';

// Create Authorization
angular.module('clientApp')
  .service('Auth', ['$http', function Auth($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var user;

    return {
      currentUser: function() {
        return user;
      },

      isLoggedIn: function() {
        return !!this.currentUser();
      },

      login: function(username, password) {
        var _user = {
          username: username,
          password: password
        };
        
        return $http.post('/login', null,
          {
            params: _user
          }
        )
        .success(function() {
            user = _user;
          }
        );
      },

      logout: function(success, error) {
        $http.post('/logout').success(function() {
          user = undefined;
          if(success) {
            success();
          }
        }).
        error(error);
      }
    };
  }]);
