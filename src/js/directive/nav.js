var angular = require('angular');


var nav = angular.module('nav', [])


.directive('navbar', ['$q', '$timeout', '$window', '$location', function($q, $timeout, $window, $location) {
	return {
		restrict: 'E',
		templateUrl: './nav.html',
		replace: true,
		link: function(scope, element, attrs) {
			
		}
	}
}])

module.exports = nav;