'use strict';

jenkinsClient.controller('ProfileCtrl', ['$scope', '$dialog', function ProfileCtrl($scope, $dialog) {

	var loggedIn = false;
	var username;

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
			icon: ' icon-user'
		},
		{
			name: 'Sign up',
			icon: ' icon-share'
		}
	];

	$scope.executeAction = function (index){
		if (loggedIn) {
			if (index === 0) {
				//Profile action
			} else if (index === 1) {
				//Log out
				loggedIn = false;
			}
		} else {
			if (index === 0) {
				$scope.opts.templateUrl = 'views/login.html';
				$scope.opts.controller = 'LoginCtrl';
				popUpAction();
			} else if (index === 1) {
				$scope.opts.templateUrl = 'views/register.html';
				$scope.opts.controller = 'RegisterCtrl';
				popUpAction();
			}
		}
	};

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_REQUIRED, function() {
		popUpAction();
	});

	var popUpAction = function (){
		var d = $dialog.dialog($scope.opts);
		d.open();
	};

	$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, function(scope, data) {
		username = data.j_username;
		loggedIn = true;
	});

	$scope.$watch(function(){return loggedIn;}, function() {
		if (loggedIn) {
			$scope.actions[0].name = username;
			$scope.actions[1].name = 'Log out';
		} else {
			$scope.actions[0].name = 'Login';
			$scope.actions[1].name = 'Sign up';
		}
	});

}
]);