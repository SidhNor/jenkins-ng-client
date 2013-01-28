/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

var jenkinsClient = angular.module('jenkinsClient', ['ngResource']);

jenkinsClient.config(['$routeProvider', '$provide', '$locationProvider', function ($routeProvider, $provide, $locationProvider) {
		$routeProvider.when('/index.html', 
		{
			templateUrl: 'views/dashboard.html', controller: 'MyCtrl1'}
		);
		$routeProvider.when('/', 
		{
			templateUrl: 'views/dashboard.html', controller: 'MyCtrl1'}
		);
		$locationProvider.html5Mode(true);
	}]
);	

