/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

// Declare app level module which depends on filters, and services
angular.module('jenkinsClient', ['jenkinsClient.filters', 'jenkinsClient.services', 'jenkinsClient.directives']).config(
	['$routeProvider', '$provide', '$httpProvider', function ($routeProvider, $provide, $httpProvider) {
		$routeProvider.when('/view1', {templateUrl: 'views/partial1.html', controller: MyCtrl1});
		$routeProvider.when('/view2', {templateUrl: 'views/partial2.html', controller: MyCtrl2});
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]
);	
