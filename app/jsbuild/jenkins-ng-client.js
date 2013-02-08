/**
 * Responsive Angular JS client for Jenins
 * @version v0.0.2 - 2013-02-08
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
jenkinsClient.eventNames.AUTH_LOGIN_REJECTED = 'event:auth-loginRejected';
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

jenkinsClient.controller('JobViewCtrl', ['$scope', '$routeParams', 'View', '$rootScope', function JobViewCtrl($scope, $routeParams, View, $rootScope) {

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

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, function() {
		$scope.views = View.query();
	});

}
]);
'use strict';
/*global $:true */

jenkinsClient.controller('LoginCtrl', ['$scope', 'dialog', '$http', '$rootScope', function LoginCtrl($scope, dialog, $http, $rootScope) {
	$scope.user = {};
	$scope.isLoggingIn = false;
	$scope.alerts = [];

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
			$scope.isLoggingIn = false;
			dialog.close();
			$rootScope.$broadcast(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, user);
			
		}).error(function(responseData, status){
			$scope.isLoggingIn = false;
			//show validation errors
			if (status === 401) {
				$rootScope.$broadcast(jenkinsClient.eventNames.AUTH_LOGIN_REJECTED);
				$scope.alerts.push({type: 'error', msg: 'Invalid login information. Please try again.'});
			} else {
				$scope.alerts.push({type: 'error', msg: 'An error occured. Please try again later.'});
			}

		});
	};

	$scope.dismissAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
}
]);
'use strict';

jenkinsClient.controller('MainPageCtrl', ['$scope', '$route', function MainPageCtrl($scope, $route) {
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
}
]);
'use strict';

jenkinsClient.controller('MenuCtrl', ['$scope', '$location', function MenuCtrl($scope, $location) {

	$scope.enabled = false;
	$scope.links = [
		{
			src: '/',
			label: 'Dashboard',
			iconClass: 'icon-home icon-white'
		},
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

jenkinsClient.controller('ProfileCtrl', ['$scope', '$dialog', function ProfileCtrl($scope, $dialog) {

	var loggedIn = false;
	var username;

	$scope.opts = {
		backdrop: true,
		keyboard: true,
		modalFade: true,
		backdropFade: true,
		backdropClick: true,
		templateUrl:  'views/login.html', 
		controller: 'LoginCtrl'
	};

	$scope.actions = [
		{
			name: 'Login',
			icon: ' icon-user'
		},
		{
			name: 'Sign up',
			icon: ' icon-share'
		}
	];

	$scope.executeAction = function (index){
		if (loggedIn) {
			if (index === 0) {
				//Profile action
			} else if (index === 1) {
				//Log out
				loggedIn = false;
			}
		} else {
			if (index === 0) {
				$scope.opts.templateUrl = 'views/login.html';
				$scope.opts.controller = 'LoginCtrl';
				popUpAction();
			} else if (index === 1) {
				$scope.opts.templateUrl = 'views/register.html';
				$scope.opts.controller = 'RegisterCtrl';
				popUpAction();
			}
		}
	};

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED, function() {
		popUpAction();
	});

	var popUpAction = function (){
		var d = $dialog.dialog($scope.opts);
		d.open();
	};

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, function(scope, data) {
		username = data.j_username;
		loggedIn = true;
	});

	$scope.$watch(function(){return loggedIn;}, function() {
		if (loggedIn) {
			$scope.actions[0].name = username;
			$scope.actions[1].name = 'Log out';
		} else {
			$scope.actions[0].name = 'Login';
			$scope.actions[1].name = 'Sign up';
		}
	});

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
