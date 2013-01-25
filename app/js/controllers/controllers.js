'use strict';

jenkinsClient.controller('MyCtrl1', ['$scope', 'View', function MyCtrl1($scope, View) {

	$scope.views = View.query();
}
]);