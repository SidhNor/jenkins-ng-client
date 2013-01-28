'use strict';

jenkinsClient.controller('MainPageCtrl', ['$scope', '$location', function MainPageCtrl($scope, $location) {
	$scope.title = 'Dashboard';

	$scope.crumbs = [
		{
			name: 'Home',
			path: '/'
		}
	];
}
]);