'use strict';

function MyCtrl1($scope, View) {

	$scope.views = View.query();
}