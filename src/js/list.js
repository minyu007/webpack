'use strict';
require('commonCss');
require('iconCss');

require('angular');
require('angular-resource');
require('nav');
require('loading');

var listApp = angular.module('listApp', ['ngResource', 'nav', 'loading'])

.controller('listCtrl', ['$scope', '$http', '$location', '$timeout', 'Service',
	function($scope, $http, $location, $timeout, Service) {
		$scope.coursesList = [];
		var init = function(){
			$scope.isLoaded = 'loaded';
			var Courses = Service.Courses();
			var coursesList = Courses.get().$promise.then(function(res) {
				$scope.coursesList = res.data;
			}, function(err) {

			});
		}

		init();

		$scope.getBooks = function(){

		}
	}
])

.factory('Service', ['$resource', function($resource) {
	var url = '/handl-front/courses';
	return {
		Courses: function() {
			return $resource(url + "/:courseId", {
				courseId: '@courseId'
			}, {});
		},

		Books: function() {
			return $resource(url + "/:coursesId/books/:booksId", {
				courseId: '@courseId',
				bookId: '@bookId'
			}, {});
		},

		Readings: function() {
			return $resource(url + "/:coursesId/books/:booksId/readings/:readingsId", {
				courseId: '@courseId',
				bookId: '@bookId',
				readingId: '@readingId'
			}, {});
		},

		Subjects: function() {
			return $resource(url + "/:courseId/books/:bookId/readings/:readingId/subjects/:subjectId", {
				courseId: '@courseId',
				bookId: '@bookId',
				readingId: '@readingId',
				subjectId: 'subjectId'
			}, {});
		}
	}
}]);