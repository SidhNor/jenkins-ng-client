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