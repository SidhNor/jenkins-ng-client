'use strict';
/*global $:true*/

jenkinsClient.controller('LoginCtrl', ['$scope', 'dialog', '$http', '$rootScope', function LoginCtrl($scope, dialog, $http, $rootScope) {
	$scope.user = {};
	$scope.isLoggingIn = false;

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
			$rootScope.$broadcast(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED);
			dialog.close();
		});
	};
}
]);