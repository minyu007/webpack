'use strict';

require('commonCss');
require('../css/a.css');
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
