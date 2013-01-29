/**
 * Responsive Angular JS client for Jenins
 * @version v0.0.2 - 2013-01-30
 * @link https://github.com/SidhNor/jenkins-ng-client
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

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


'use strict';

/* Services */

jenkinsClient.value('version', '0.0.2');

jenkinsClient.factory('View', ['$resource', function ($resource){
	return $resource('/api/json', {tree: 'views[name,jobs[name]]'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
}
]);
'use strict';

jenkinsClient.controller('ActionsCtrl', ['$scope', function ActionsCtrl($scope) {
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
]);
'use strict';

jenkinsClient.controller('BuildQueueCtrl', ['$scope', function BuildQueueCtrl($scope) {
	
}
]);
'use strict';

jenkinsClient.controller('JobCtrl', ['$scope', '$routeParams', function JobCtrl($scope, $routeParams) {

}
]);
'use strict';

jenkinsClient.controller('JobViewCtrl', ['$scope', '$routeParams', 'View', function JobViewCtrl($scope, $routeParams, View) {

	$scope.views = View.query(function() {
		if ($routeParams.hasOwnProperty('jobViewName')) {
			for (var i in $scope.views.views) {
				if ($scope.views.views[i].name === $routeParams.jobViewName) {
					$scope.currentView = $scope.views.views[i];
					break;
				}
			}
		}
	});
}
]);
'use strict';

jenkinsClient.controller('MainPageCtrl', ['$scope', '$route', function MainPageCtrl($scope, $route) {
	$scope.title = 'Dashboard';
	
	$scope.$on('$locationChangeSuccess', function(scope) {
		if ($route.current) {
			if ($route.current.params.hasOwnProperty('jobViewName')) {
				$scope.title = 'View: ' + $route.current.params.jobViewName;
			}
		}
	});
	$scope.crumbs = [
		{
			name: 'Home',
			path: '#'
		},
		{
			name: 'View',
			path: '#view/MyView'
		}
	];
}
]);
'use strict';

jenkinsClient.controller('MenuCtrl', ['$scope', '$location', function MenuCtrl($scope, $location) {

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
}
]);

'use strict';

/* Filters */

jenkinsClient.filter('interpolate', function () {

});
'use strict';

/* Directives */

jenkinsClient.directive('appVersion', ['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}]
);
