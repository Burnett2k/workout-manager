var myModule = angular.module('WodCtrl', []);

myModule.directive("toggleButtonClass", function() {
	return {
		link: function($scope, element, attr) {
      		element.on("click", function() {
        	element.toggleClass("btn-danger");
  		});
    	}
	}
})

myModule.controller('WODController', ['$scope', '$http', 'Wod', 'WodLog', function($scope, $http, Wod, WodLog) {

	//$scope.wod = 'Workout of the day is...';
	$scope.buttonClass = "btn-danger";
	$scope.activeButtons = [];
	$scope.wods = [];
	$scope.wodLogs = [];
	$scope.editing = null;
	$scope.newWodImage = null;
	$scope.updatedWodImg = null;
	
	var now = new Date();
	var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	var sunday = new Date(today.setDate(today.getDate()-today.getDay()));
	var saturday = new Date(today.setDate(today.getDate()-today.getDay()+6));

	$scope.firstDay = sunday.getMonth() + 1 + "/" + sunday.getDate() + "/" + sunday.getFullYear();
	$scope.lastDay =  saturday.getMonth() + 1 + "/" + saturday.getDate() + "/" +saturday.getFullYear();

    Wod.get().then(function(res) {
    	$scope.wods = res.data;
    });	

    WodLog.get($scope.firstDay, $scope.lastDay).then(function(res) {
    	$scope.wodLogs = res.data;

    	//when we retrieve wods add them to an active arrow for button class
    	$scope.wodLogs.forEach( function (wodlog) {
    		$scope.activeButtons.push(wodlog.wodId);
    	});
    });


    getWodLogs = function() {
	    WodLog.get($scope.firstDay, $scope.lastDay).then(function(res) {
	    	$scope.wodLogs = res.data;
	    	$scope.activeButtons = [];

	    	//when we retrieve wods add them to an active arrow for button class
	    	$scope.wodLogs.forEach( function (wodlog) {
	    		$scope.activeButtons.push(wodlog.wodId);
	    	});
	    });
    };

	$scope.toggleButtonState = function(wod) {
		//check if id exists in array. if it does, remove it. if it doesn't add it.
		if ($.inArray(wod._id, $scope.activeButtons) > -1) {
			console.log("it is in array so we will delete");

			//delete
			$scope.activeButtons.splice($scope.activeButtons.indexOf(wod._id));
			deleteWodLog(wod);


		} else {
			console.log("not in array so adding");
			$scope.activeButtons.push(wod._id);
			createWodLog(wod);
		}

		console.log($scope.activeButtons);
	};

    $scope.createWod = function() {

		console.log("wodimage " + $scope.newWodImage);
    	var json = {
    		"name": $scope.newWodName,
    		"description": $scope.newWodDescription,
    		"imgs": [ $scope.newWodImage ]
    	};

        Wod.create(json).then(function(res) {
            console.log("wod saved");
        });

        $scope.newWodName = '';
        $scope.newWodDescription = '';
        $scope.newWodImage = '';
    };

    $scope.deleteWod = function(wod) {
    	Wod.delete(wod._id).then(function(res) {
    		var index = $scope.wods.indexOf(wod);
            $scope.wods.splice(index, 1);
    		console.log("deleted")
    	} )
    };

    $scope.getPreviousWeekWodLog = function() {
    	sunday.setDate(sunday.getDate() - 7);
    	saturday.setDate(saturday.getDate() - 7);
    	$scope.firstDay = sunday.getMonth() + 1 + "/" + sunday.getDate() + "/" + sunday.getFullYear();
		$scope.lastDay =  saturday.getMonth() + 1 + "/" + saturday.getDate() + "/" +saturday.getFullYear();
		getWodLogs();
    };

	$scope.getNextWeekWodLog = function() {
    	sunday.setDate(sunday.getDate() + 7);
    	saturday.setDate(saturday.getDate() + 7);
    	$scope.firstDay = sunday.getMonth() + 1 + "/" + sunday.getDate() + "/" + sunday.getFullYear();
		$scope.lastDay =  saturday.getMonth() + 1 + "/" + saturday.getDate() + "/" +saturday.getFullYear();
		getWodLogs();
	};

	$scope.toggleEditing = function(i, img) {
		
		if ($scope.editing == i) {
			$scope.editing = null;
			$scope.newWodImage = null;
		} else {
			$scope.editing = i;	
			$scope.newWodImage = img;
		}
	}

	$scope.updateWodImg = function(wod, imgs, i) {


		var json = {
			"id" : wod._id,
			"imgs" : [ imgs ]
		}

		$scope.editing = null;	
		$scope.updatedWodImg = null;

		if (json.id && json.imgs) {
			Wod.update(json).then(function(res) {
				//update model now that database has been updated
				$scope.wods[i].imgs = json.imgs;	
			})
		}
	}

    createWodLog = function(wod) {
    	var dateToLog = new Date();

    	//if the last day is earlier than the current date, we are logging for a previous week and default to counting it on Saturday
    	if (saturday < dateToLog) {
    		dateToLog = saturday;
    	}

    	var json = {
    		"wodId": wod._id,
    	    "wodName" : wod.wodName,
		    "timeCompleted": dateToLog
    	};

    	//todo move adding to the array after the db save maybe?
        WodLog.create(json).then(function(res) {
            $scope.wodLogs.push(res.data.wodLog);
            console.log("wod log saved");
        });
    }

    deleteWodLog = function(wod) {
    	//todo move adding to the array after the db save maybe?
    	$scope.wodLogs.forEach( function (wodLog)
		{
			console.log("entering loop");

			if (wod._id === wodLog.wodId) {
				
		 	   var wodId = wodLog.wodId;
		 	   console.log("found a match");
		 	    WodLog.delete(wodLog._id).then(function(res) {
	 	    		$scope.wodLogs.splice($scope.wodLogs.indexOf(wodLog._id));
    				console.log("deleted");
				});
			}
		});
    }

}]);	