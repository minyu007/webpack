require('commonCss');
require('iconCss');

var angular = require('angular');

var loginApp = angular.module('loginApp', [])

.controller('loginCtrl', ['$scope', '$http', '$location', '$timeout',
	function($scope, $http, $location, $timeout) {
		//$scope.isVisible = ''
		//$timeout(function(){
			$scope.isVisible = 'visible'
		//}, 500);
	}
])
