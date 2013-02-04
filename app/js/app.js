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

jenkinsClient.eventNames = {};
jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED = 'event:auth-loginRequired';
jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED = 'event:auth-loginConfirmed';
jenkinsClient.eventNames.AUTH_LOGIN_REJECTED = 'event:auth-loginRejected';