// public/js/controllers/RoutineCtrl.js
var myModule = angular.module('RoutineCtrl', []);

myModule.controller('RoutineController', ['$scope', '$http', 'Routine', function($scope, $http, Routine) {

    $scope.tagline = 'Nothing beats a pocket protector!';

    $scope.routines = [];

    $scope.checkboxWeekDayModel = {
        sunday : false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false
    };   

    $scope.checkboxFeatureModel = {
        getQotd : false,
        getWeather: false
    };  

    Routine.get().then(function(res) {
    	$scope.routines = res.data;
    })

    $scope.createRoutine = function() {

        var routineArray = new Array();

        if ($scope.checkboxWeekDayModel.sunday) { 
            routineArray.push(0);
        };
        if ($scope.checkboxWeekDayModel.monday) { 
            routineArray.push(1)
        };
        if ($scope.checkboxWeekDayModel.tuesday) { 
            routineArray.push(2)
        };
        if ($scope.checkboxWeekDayModel.wednesday) { 
            routineArray.push(3)
        };
        if ($scope.checkboxWeekDayModel.thursday) { 
            routineArray.push(4)
        };
        if ($scope.checkboxWeekDayModel.friday) { 
            routineArray.push(5)
        };
        if ($scope.checkboxWeekDayModel.saturday) { 
            routineArray.push(6)
        };

    	var json = {
    		"name": $scope.newRoutineName,
    		"hour": $scope.newRoutineHour,
    		"minute": $scope.newRoutineMinute,
    		"dayOfWeek": routineArray,
            "message": $scope.newRoutineMessage,
            "getWeather" : $scope.checkboxFeatureModel.getWeather,
            "getQotd" : $scope.checkboxFeatureModel.getQotd
    	};

        Routine.create(json).then(function(res) {
            console.log("routine saved");
        });
        
        $http.post('/createRoutine', JSON.stringify(json))
        .then(function() {
            console.log("success");
        })   // success
        .catch(function() {
            console.log("error");
        }); // error
    	

    };
    $scope.deleteRoutine = function(routine) {
        var json = {
            "name": routine.name
        }

        Routine.delete(routine._id).then(function(res) {
            var index = $scope.routines.indexOf(routine);
            $scope.routines.splice(index, 1);
            console.log("routine deleted");
        });

        $http.post('/deleteRoutine', JSON.stringify(json))
        .then(function() {
            console.log("success");
        })   // success
        .catch(function() {
            console.log("error");
        }); // error
    };
}]);