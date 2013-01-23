'use strict';

/* Controllers */


function MenuCtrl($scope) {
	$scope.enabled = false;

	$scope.links = [
		{
			src: 'test.html',
			label: 'New job',
			iconClass: ''
		},
		{
			src: 'test.html',
			label: 'People',
			iconClass: ''
		}
	];
	
	$scope.launchTask = function (val) {

	};
}

function BuildQueueCtrl($scope) {
	
}

function ActionsCtrl($scope) {
	$scope.actions = [
		{
			title: '',
			tooltipText: '',
			iconClass: ''
		}
	];
}

function MyCtrl1($scope, View) {

	$scope.views = View.query();
}