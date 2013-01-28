/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

var jenkinsClient = angular.module('jenkinsClient', ['ngResource']);

jenkinsClient.config(['$routeProvider', '$provide', '$locationProvider', function ($routeProvider, $provide, $locationProvider) {
		$routeProvider.when('/index.html', 
		{
			templateUrl: 'views/dashboard.html', controller: 'JobViewCtrl'}
		);
		$routeProvider.when('/', 
		{
			templateUrl: 'views/dashboard.html', controller: 'JobViewCtrl'}
		);
		$routeProvider.when('/view/:jobViewName',
		{
			templateUrl: 'views/jobviews.html', controller: 'JobViewCtrl'}
		);
		$routeProvider.when('/job/:jobName',
		{
			templateUrl: 'views/job.html', controller: 'JobCtrl'}
		);
		$locationProvider.html5Mode(true);
	}]
);	

