'use strict';

/* Controllers */


function MenuCtrl($scope) {
	$scope.links = [
		{
			src: 'test.html',
			label: 'New job'
		},
		{
			src: 'test.html',
			label: 'People'
		}
	];
	$scope.launchTask = function (val) {

	};
}

function MyCtrl1($scope, View) {

	$scope.views = View.query();
}

function MyCtrl2() {

}