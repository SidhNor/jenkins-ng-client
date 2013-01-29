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