/**
 * Responsive Angular JS client for Jenins
 * @version v0.0.2 - 2013-01-24
 * @link https://github.com/SidhNor/jenkins-ng-client
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

// Declare app level module which depends on filters, and services
angular.module('jenkinsClient', ['jenkinsClient.filters', 'jenkinsClient.services', 'jenkinsClient.directives']).config(
	['$routeProvider', '$provide', '$locationProvider', function ($routeProvider, $provide, $locationProvider) {
		$routeProvider.when('/index.html', {templateUrl: '/views/partial1.html', controller: MyCtrl1});
		$locationProvider.html5Mode(true);
	}]
);	


'use strict';

/* Services */

var serviceModule = angular.module('jenkinsClient.services', ['ngResource']);
serviceModule.value('version', '0.0.2');
serviceModule.factory('View', function($resource){
	return $resource('/api/json', {tree: 'views[name,jobs[name]]'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
});
'use strict';

function ActionsCtrl($scope) {
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
}
'use strict';

function BuildQueueCtrl($scope) {
	
}
'use strict';

function MyCtrl1($scope, View) {

	$scope.views = View.query();
}
'use strict';

function MenuCtrl($scope, $location) {

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

	$scope.$watch(function () { return $location.path(); }, function(newValue, oldValue) {
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
}

'use strict';

/* Filters */

angular.module('jenkinsClient.filters', []).filter('interpolate', 
	[function(){}]
);
'use strict';

/* Directives */


angular.module('jenkinsClient.directives', []).directive('appVersion', 
	['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}]
);
