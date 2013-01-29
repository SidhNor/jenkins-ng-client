'use strict';

var jenkinsClient = angular.module('jenkinsClient', ['ngResource', 'ui.bootstrap', 'ui.bootstrap.tpls']);

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
	}]
);	

