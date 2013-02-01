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