/**
 * Responsive Angular JS client for Jenins
 * @version v0.0.2 - 2013-01-25
 * @link https://github.com/SidhNor/jenkins-ng-client
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

var jenkinsClient = angular.module('jenkinsClient', ['ngResource']);

jenkinsClient.config(['$routeProvider', '$provide', '$locationProvider', function ($routeProvider, $provide, $locationProvider) {
		$routeProvider.when('/index.html', {templateUrl: '/views/partial1.html', controller: 'MyCtrl1'});
		$locationProvider.html5Mode(true);
	}]
);	

/* Services */

jenkinsClient.value('version', '0.0.2');

jenkinsClient.factory('View', function($resource){
	return $resource('/api/json', {tree: 'views[name,jobs[name]]'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
});

jenkinsClient.controller('ActionsCtrl', function ActionsCtrl($scope) {
	$scope.actions = [
		{
			title: 'New job',
			tooltipText: 'Create a new Job',
			iconClass: 'icon-plus-sign'
		},
		{
			title: 'People',
			tooltipText: 'See people on the project',
			iconClass: 'icon-user'
		},
		{
			title: 'Build current job',
			tooltipText: 'Build current job',
			iconClass: 'icon-time'
		}
	];
});
jenkinsClient.controller('BuildQueueCtrl', function BuildQueueCtrl($scope) {
	
});
jenkinsClient.controller('MyCtrl1', function MyCtrl1($scope, View) {

	$scope.views = View.query();
});

jenkinsClient.controller('MenuCtrl', function MenuCtrl($scope, $location) {

	$scope.enabled = false;

	$scope.links = [
		{
			src: '/status',
			label: 'Status',
			iconClass: ''
		},
		{
			src: '/changes',
			label: 'Changes',
			iconClass: ''
		},
		{
			src: '/violations',
			label: 'Violations',
			iconClass: ''
		},
		{
			src: '/coverage',
			label: 'Coverage',
			iconClass: ''
		}
	];

	$scope.$watch(function () { return $location.path(); }, function (newValue, oldValue) {
		if (newValue.indexOf('job') !== -1) {
			$scope.enabled = true;
		} else {
			$scope.enabled = false;
		}
	});
	
	$scope.launchTask = function (val) {
		if ($scope.enabled === false) {
			return;
		}
		$location.path(val.src);

	};
});
/* Filters */

jenkinsClient.filter('interpolate', function () {

});
/* Directives */

jenkinsClient.directive('appVersion', ['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}]
);
