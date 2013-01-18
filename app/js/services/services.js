'use strict';

/* Services */

var serviceModule = angular.module('jenkinsClient.services', ['ngResource']);
serviceModule.value('version', '0.1');
serviceModule.factory('View', function($resource){
	return $resource('http://mdch-det-dev01::port/api/json?tree=views[name,jobs[name]]', {port: '8080'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
});