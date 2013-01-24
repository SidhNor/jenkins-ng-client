/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

// Declare app level module which depends on filters, and services
angular.module('jenkinsClient', ['jenkinsClient.filters', 'jenkinsClient.services', 'jenkinsClient.directives']).config(
	['$routeProvider', '$provide', '$locationProvider', function ($routeProvider, $provide, $locationProvider) {
		$routeProvider.when('/index.html', {templateUrl: '/views/partial1.html', controller: MyCtrl1});
		$locationProvider.html5Mode(true);
	}]
);	

