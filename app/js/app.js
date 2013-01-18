'use strict';

// Declare app level module which depends on filters, and services
angular.module('jenkinsClient', ['jenkinsClient.filters', 'jenkinsClient.services', 'jenkinsClient.directives', 'ngResource']).config(
	['$routeProvider', '$provide', '$httpProvider', function ($routeProvider, $provide, $httpProvider) {
		$routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: MyCtrl1});
		$routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: MyCtrl2});
		//$routeProvider.otherwise({redirectTo: '/view1'});

		$provide.factory('myHttpInterceptor', function($q) {
		  return function(promise) {
		    return promise.then(function(response) {
		    	if(response.headers()['content-type'] === "application/json;charset=UTF-8"){
                // Validate response if not ok reject
	                var data = response;

	                if(!data)
	                    return $q.reject(response);
	            }
		    	return response;
		    }, function(response) {
		      // do something on error
		      if (canRecover(response)) {
		        return response;
		      }
		      return $q.reject(response);
		    });
		  }
		});

		$httpProvider.responseInterceptors.push('myHttpInterceptor');
	}]
);
