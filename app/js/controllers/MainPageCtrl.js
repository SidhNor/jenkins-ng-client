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