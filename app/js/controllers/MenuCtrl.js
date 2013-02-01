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
