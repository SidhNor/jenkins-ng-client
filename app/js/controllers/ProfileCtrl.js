'use strict';

jenkinsClient.controller('ProfileCtrl', ['$scope', '$dialog', function ProfileCtrl($scope, $dialog) {

	var loggedIn = false;

	$scope.opts = {
		backdrop: true,
		keyboard: true,
		modalFade: true,
		backdropFade: true,
		backdropClick: true,
		templateUrl:  'views/login.html', 
		controller: 'LoginCtrl'
	};

	$scope.actions = [
		{
			name: 'Login',
			path: '',
			icon: ' icon-user'
		},
		{
			name: 'Sign up',
			path: '',
			icon: ' icon-user'
		}
	];

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED, function() {
		var d = $dialog.dialog($scope.opts);
		d.open().then(function(result){
			if(result)
			{
				
			}
		});
	});

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, function() {
		loggedIn = true;
	});

}
]);