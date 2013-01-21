/**
 * Responsive Angular JS client for ugly but usefull Jenins
 * @version v0.0.1 - 2013-01-21
 * @link https://github.com/SidhNor/jenkins-ng-client
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

// Declare app level module which depends on filters, and services
angular.module('jenkinsClient', ['jenkinsClient.filters', 'jenkinsClient.services', 'jenkinsClient.directives']).config(
	['$routeProvider', '$provide', '$locationProvider', function ($routeProvider, $provide, $locationProvider) {
		$routeProvider.when('/plugin/ng/index.html', {templateUrl: '/plugin/ng/views/partial1.html', controller: MyCtrl1});
		$routeProvider.otherwise({redirectTo: '/plugin/ng/index.html'});
		$locationProvider.html5Mode(true);
	}]
);	

'use strict';

/* Services */

var serviceModule = angular.module('jenkinsClient.services', ['ngResource']);
serviceModule.value('version', '0.1');
serviceModule.factory('View', function($resource){
	return $resource('/api/json', {tree: 'views[name,jobs[name]]'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
});
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
'use strict';

/* Filters */

angular.module('jenkinsClient.filters', []).filter('interpolate', 
	[]
);
'use strict';

/* Directives */


angular.module('jenkinsClient.directives', []).directive('appVersion', 
	['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}]
);
