'use strict';

require('commonCss');
require('iconCss');
require('aCss');

var $ = require('jquery');
var _ = require('lodash');

$.ajax({
	type: 'GET',
	url: '/handl-front/hello',

	success: function(data){
		$('#root').text(data);
	},
	dataType: 'json'
});