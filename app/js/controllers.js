'use strict';

/* Controllers */


function MyCtrl1($resource, $http) {

	$http.get('http://mdch-det-dev01:8080/api/json?pretty=true').success(function (data) {
		console.log(data);
	});

	var View = $resource('http://mdch-det-dev01::port/api/json?tree=views[name,jobs[name]]', {port: '8080'});
	var user = View.get();
}

MyCtrl1.$inject = ['$resource', '$http'];



function MyCtrl2() {
}
MyCtrl2.$inject = [];
