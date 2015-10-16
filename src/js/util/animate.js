
'use strict';
require('angular');
require('jquery');

module.exports = angular.module('animate', [])

.animation('.repeated-item', function() {
	return {
		enter: function(element, done) {
			element.css('opacity', 0);
			jQuery(element).animate({
				opacity: 1
			}, done);

			
			return function(isCancelled) {
				if (isCancelled) {
					jQuery(element).stop();
				}
			}
		},
		leave: function(element, done) {
			element.css('opacity', 1);
			jQuery(element).animate({
				opacity: 0
			}, done);

			return function(isCancelled) {
				if (isCancelled) {
					jQuery(element).stop();
				}
			}
		},
		move: function(element, done) {
			element.css('opacity', 0);
			jQuery(element).animate({
				opacity: 1
			}, done);

			return function(isCancelled) {
				if (isCancelled) {
					jQuery(element).stop();
				}
			}
		},

		addClass: function(element, className, done) {},
		removeClass: function(element, className, done) {}
	}
});