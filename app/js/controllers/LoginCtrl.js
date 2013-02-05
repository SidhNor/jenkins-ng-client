'use strict';
/*global $:true*/

jenkinsClient.controller('LoginCtrl', ['$scope', 'dialog', '$http', '$rootScope', function LoginCtrl($scope, dialog, $http, $rootScope) {
	$scope.user = {};
	$scope.isLoggingIn = false;
	$scope.alerts = [];

	$scope.submit = function(user) {
		$scope.isLoggingIn = true;
		$http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		$http.post('/j_acegi_security_check', user, 
			{
				transformRequest: function(data){
					return $.param(data);
				}
			})
		.success(function(responseData){
			$scope.isLoggingIn = false;
			$rootScope.$broadcast(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED);
			dialog.close(user);
		}).error(function(responseData, status){
			$scope.isLoggingIn = false;
			//show validation errors
			if (status === 401) {
				$rootScope.$broadcast(jenkinsClient.eventNames.AUTH_LOGIN_REJECTED);
				$scope.alerts.push({type: 'error', msg: 'Invalid login information. Please try again.'});
			} else {
				$scope.alerts.push({type: 'error', msg: 'An error occured. Please try again later.'});
			}

		});
	};

	$scope.dismissAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};
}
]);