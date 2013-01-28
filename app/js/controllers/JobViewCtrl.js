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