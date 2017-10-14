// public/js/services/RoutineService.js
angular.module('RoutineService', []).factory('Routine', ['$http', function($http) {

    return {
        // call to get all routines
        get : function() {
            return $http.get('/api/routines');
        },

        // call to POST and create a new routines
        create : function(routineData) {
            return $http.post('/api/routines', routineData);
        },

        // call to DELETE a routines
        delete : function(id) {
            return $http.delete('/api/routines/' + id);
        }
    }       

}]);