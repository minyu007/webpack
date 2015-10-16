'use strict';
require('commonCss');
require('iconCss');

var angular = require('angular');
require('nav');


var homeApp = angular.module('homeApp', ['nav'])

.controller('homeCtrl', ['$scope', '$http', '$location', '$timeout',
	function($scope, $http, $location, $timeout) {
		//$scope.isLoaded = ''
		//$timeout(function(){
			$scope.isLoaded = 'loaded'
		//}, 500);
	}
])