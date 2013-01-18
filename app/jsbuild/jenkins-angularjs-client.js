/**
 * Responsive Angular JS client for ugly but usefull Jenins
 * @version v0.0.1 - 2013-01-19
 * @link https://github.com/SidhNor/jenkins-angularjs-client
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

/*global MyCtrl1: true, MyCtrl2: true*/

'use strict';

// Declare app level module which depends on filters, and services
angular.module('jenkinsClient', ['jenkinsClient.filters', 'jenkinsClient.services', 'jenkinsClient.directives']).config(
	['$routeProvider', '$provide', '$httpProvider', function ($routeProvider, $provide, $httpProvider) {
		$routeProvider.when('/view1', {templateUrl: 'views/partial1.html', controller: MyCtrl1});
		$routeProvider.when('/view2', {templateUrl: 'views/partial2.html', controller: MyCtrl2});
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]
);	

'use strict';

/* Services */

var serviceModule = angular.module('jenkinsClient.services', ['ngResource']);
serviceModule.value('version', '0.1');
serviceModule.factory('View', function($resource){
	return $resource('http://mdch-det-dev01::port/api/json?tree=views[name,jobs[name]]', {port: '8080'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
});
'use strict';

/* Controllers */

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
