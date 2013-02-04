/**
 * Responsive Angular JS client for Jenins
 * @version v0.0.2 - 2013-02-01
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

jenkinsClient.eventNames = {};
jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED = 'event:auth-loginRequired';
jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED = 'event:auth-loginConfirmed';
'use strict';

/* Services */

jenkinsClient.value('version', '0.0.2');

jenkinsClient.factory('View', ['$resource', function ($resource){
	return $resource('/api/json', {tree: 'views[name,jobs[name,color,healthReport[description,score]]]'}, {
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
			tooltipText: 'See people',
			iconClass: 'icon-user'
		},
		{
			title: 'Build History',
			tooltipText: 'See build history',
			iconClass: 'icon-list-alt'
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

jenkinsClient.controller('JobViewCtrl', ['$scope', '$rootScope','$routeParams', 'View', function JobViewCtrl($scope, $rootScope, $routeParams, View) {

	$scope.views = View.query(function() {
		if ($routeParams.hasOwnProperty('jobViewName')) {
			for (var i in $scope.views.views) {
				if ($scope.views.views[i].name === $routeParams.jobViewName) {
					$scope.currentView = $scope.views.views[i];
					break;
				}
			}
		}
		if ($scope.views.views.length === 0) {
			$rootScope.$broadcast(jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED);
		}
	});
}
]);
'use strict';
/*global $:true*/

jenkinsClient.controller('LoginCtrl', ['$scope', 'dialog', '$http', function LoginCtrl($scope, dialog, $http) {
	$scope.user = {};
	$scope.isLoggingIn = false;

	$scope.submit = function(user) {
		$scope.isLoggingIn = true;
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$http.post('/j_acegi_security_check', user, 
			{
				transformRequest: function(data){
					return $.param(data);
				}
			})
		.success(function(responseData){
			$scope.$emit(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED);
			dialog.close();
		}).error(function(responseData, status){
			//show validation errors
			if (status === 401) {
				//Invalid login information
			} else {
				//some other error
			}

		});
	};
}
]);
'use strict';

jenkinsClient.controller('MainPageCtrl', ['$scope', '$route', '$dialog', function MainPageCtrl($scope, $route, $dialog) {
	$scope.title = 'Dashboard';
	
	$scope.$on('$locationChangeSuccess', function () {
		if ($route.current) {
			if ($route.current.params.hasOwnProperty('jobViewName')) {
				$scope.title = 'View: ' + $route.current.params.jobViewName;
			} else if ($route.current.params.hasOwnProperty('jobName')) {
				$scope.title = 'Job: ' + $route.current.params.jobName;
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

	$scope.loginFormShown = true;

	$scope.opts = {
		backdrop: true,
		keyboard: true,
		modalFade: true,
		backdropFade: true,
		backdropClick: true,
		templateUrl:  'views/login.html', 
		controller: 'LoginCtrl'
	};

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED, function() {
		var d = $dialog.dialog($scope.opts);
		d.open().then(function(result){
			if(result)
			{
				
			}
		});
	});

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, function() {
		$scope.loginFormShown = false;
	});

}
]);
'use strict';

jenkinsClient.controller('MenuCtrl', ['$scope', '$location', function MenuCtrl($scope, $location) {

	$scope.enabled = false;
	$scope.links = [
		{
			src: '/status',
			label: 'Status',
			iconClass: 'icon-search icon-white'
		},
		{
			src: '/changes',
			label: 'Changes',
			iconClass: 'icon-book icon-white'
		},
		{
			src: '/violations',
			label: 'Violations',
			iconClass: 'icon-warning-sign icon-white'
		},
		{
			src: '/coverage',
			label: 'Coverage',
			iconClass: 'icon-briefcase icon-white'
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
