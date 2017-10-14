// public/js/services/WodService.js
angular.module('WodService', []).factory('Wod', ['$http', function($http) {

    return {
        // call to get all wods
        get : function() {
            return $http.get('/api/wods');
        },

        // call to POST and create a new wod
        create : function(wodData) {
            return $http.post('/api/wods', wodData);
        },

        // call to DELETE a wod
        delete : function(id) {
            return $http.delete('/api/wods/' + id);
        },

        // call to Update a wod
        update : function(wodData) {
            return $http.post('/api/wods/' + wodData.id, wodData);
        }
    }       

}]);

