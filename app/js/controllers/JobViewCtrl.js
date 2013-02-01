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