angular.module('UserService', []).factory('User', ['$http', function($http) {

    return {
        // call to create a user
        create : function(userData) {
            return $http.post('/api/user', userData);
        },

        // call to DELETE a user
        delete : function(id) {
            return $http.delete('/api/user/' + id);
        }
    }       

}]);