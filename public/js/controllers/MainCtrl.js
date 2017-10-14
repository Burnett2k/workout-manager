// public/js/controllers/MainCtrl.js
var myApp = angular.module('MainCtrl', []);

myApp.controller('MainController', ['$scope', '$http', function($scope, $http) {

	$scope.msg = {};

	$scope.currentTrack;

	var source = new EventSource('/sonosChange');
	source.addEventListener('message', function(event) {
		$scope.$apply(function()  {
			$scope.msg = JSON.parse(event.data);
			console.log(event.data);
		});
		
		// console.log('message received');
		// console.log(event.data);
	}, false);
	source.addEventListener('open', function(e) {
		console.log("connection was opened");
	}, false);
	source.addEventListener('error', function(e) {
		console.log("error occured");
		console.log(e);
	}, false);

	$scope.previousTrack = function () {
		$http.get('http://localhost:5005/master%20room/previous').
       	then(function (response) { 
       		$scope.sonosResult = response.data.status;
        }, function (response) {
        	console.log(response);
       		$scope.sonosResult = 'error';
        });
	};
	$scope.pauseSonos = function () {
		$http.get('http://localhost:5005/master%20room/pause').
       	then(function (response) { 
       		$scope.sonosResult = response.data.status;
        }, function (response) {
       		$scope.sonosResult = 'error';
        });
	};
	$scope.playSonos = function() {
		$http.get('http://localhost:5005/master%20room/play').
		then(function (response) { 
	   		$scope.sonosResult = response.data.status;
	    }, function (response) {
		   	$scope.sonosResult = 'error';
	   });
	};
	$scope.nextTrack = function () {
		$http.get('http://localhost:5005/master%20room/next').
       	then(function (response) { 
       		$scope.sonosResult = response.data.status;
        }, function (response) {
       		$scope.sonosResult = 'error';
        });
	};
	$scope.sayCommand = function(speechText) {
		if (speechText) {
			$http.get('http://localhost:5005/master%20room/say/' + encodeURIComponent(speechText)).
	       	then(function (response) { 
	       		$scope.sonosResult = response.data.status;
	        }, function (response) {
	       		$scope.sonosResult = 'error';
	        });
       }
	};
	$scope.searchMusic = function(musicSearchText) {
		console.log("searching for songs by " + musicSearchText);
		if (musicSearchText) {
			$http.get('http://localhost:5005/master%20room/musicsearch/spotify/song/artist:' + encodeURIComponent(musicSearchText)).
	       	then(function (response) { 
	       		$scope.sonosResult = response.data.status;
	        }, function (response) {
	       		$scope.sonosResult = 'error';
	        });
       }
	};
	$scope.searchMusicRadio = function(radioText) {
		console.log("searching for songs by " + radioText);
		if (radioText) {
			$http.get('http://localhost:5005/master%20room/musicsearch/spotify/station/artist:' + encodeURIComponent(radioText)).
	       	then(function (response) { 
	       		$scope.sonosResult = response.data.status;
	        }, function (response) {
	       		$scope.sonosResult = 'error';
	        });
       }
	};
	$scope.searchMusicAlbum = function(albumText) {
		console.log("searching for songs by " + albumText);
		if (albumText) {
			$http.get('http://localhost:5005/master%20room/musicsearch/spotify/album/' + encodeURIComponent(albumText)).
	       	then(function (response) { 
	       		$scope.sonosResult = response.data.status;
	        }, function (response) {
	       		$scope.sonosResult = 'error';
	        });
       }
	};

	$scope.increaseVolume = function() {
		adjustVolume('+5');
	};
	$scope.decreaseVolume = function() {
		adjustVolume('-5');
	};
	adjustVolume = function(increment) {
		
		console.log("adjusting volume by " + increment);
		$http.get('http://localhost:5005/master%20room/volume/' + increment).
       	then(function (response) { 
       		$scope.sonosResult = response.data.status;
        }, function (response) {
       		$scope.sonosResult = 'error'; 
        });
	};
	$scope.toggleLights = function(setting) {
		console.log("toggling lights");
		$http.put('http://192.168.1.2/api/JFrRiCjcmLRcI8v7RLq1QEpQXZp4UyjXtdjylYyC/lights/1/state/', {"on":setting}).
		then(function (response) {
			$scope.hueResult = response.statusText;
		}, function (response) {
			$scope.hueResult = 'error';
		});
	};
	$scope.brightenLights = function() {
		adjustLights('10');
	};
	$scope.dimLights = function() {
		adjustLights('-10');
	}
	adjustLights = function(increment) {
		//doesn't look like there is a method to decrease the value by a certain amount. I'll have to grab the current value to decrease it
		$http.put('http://192.168.1.2/api/JFrRiCjcmLRcI8v7RLq1QEpQXZp4UyjXtdjylYyC/lights/1/state/', {"bri_inc":increment}).
		then(function (response) {
			$scope.hueResult = response.statusText;
		}, function (response) {
			$scope.hueResult = 'error';
		});
		$scope.hueResult = "success";
	}

    $scope.tagline = 'Sonos Controls';   

}]);