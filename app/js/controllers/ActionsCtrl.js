'use strict';

function ActionsCtrl($scope) {
	$scope.actions = [
		{
			title: 'New job',
			tooltipText: 'Create a new Job',
			iconClass: 'icon-plus-sign'
		},
		{
			title: 'People',
			tooltipText: 'See people on the project',
			iconClass: 'icon-user'
		},
		{
			title: 'Build current job',
			tooltipText: 'Build current job',
			iconClass: 'icon-time'
		}
	];
}