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
