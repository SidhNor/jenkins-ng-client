'use strict';

/* Controllers */


function MyCtrl1($scope, $resource, $http) {

	$http.get('http://mdch-det-dev01:8080/api/json?pretty=true').success(function (data) {
		console.log(data);
	});

	var View = $resource('http://mdch-det-dev01::port/api/json?tree=views[name,jobs[name]]', {port: '8080'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
	$scope.views = View.query();
}

MyCtrl1.$inject = ['$scope', '$resource', '$http'];



function MyCtrl2() {
}
MyCtrl2.$inject = [];
