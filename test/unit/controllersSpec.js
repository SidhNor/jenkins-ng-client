'use strict';

/* jasmine specs for controllers go here */
describe('Controllers', function () {
	beforeEach(module('jenkinsClient'));
	
	describe('MenuCtrl', function (){
		var menuCtrl;
		var scope;

		beforeEach(inject(function ($rootScope, $controller){
			scope = $rootScope.$new();
			menuCtrl = $controller('MenuCtrl', {$scope: scope});
		}));
		
		it('should have menu links', function () {
			expect(angular.isDefined(scope.links)).toBeTruthy()
		});

		it('should have menu links with src', function () {
			for(var i in scope.links) {
				expect(angular.isDefined(scope.links[i].src)).toBeTruthy();
				expect(angular.isString(scope.links[i].src)).toBeTruthy();
			}
		});

		it('should have menu links with label', function () {
			for(var i in scope.links) {
				expect(angular.isDefined(scope.links[i].label)).toBeTruthy();
				expect(angular.isString(scope.links[i].label)).toBeTruthy();
			}
		});

		it('should have menu links with iconClass', function () {
			for(var i in scope.links) {
				expect(angular.isDefined(scope.links[i].iconClass)).toBeTruthy(); 
				expect(angular.isString(scope.links[i].iconClass)).toBeTruthy();
			}
		});

	});

	describe('BuildQueueCtrl', function () {

		it('should have all the machines on the server', function () {

		});

		it('should have all pending task for each machine', function () {

		});

		it('should have a placeholder when no tasks are queued on a machine', function () {

		});

	});

	describe('ActionsCtrl', function () {
		
		it('should have an action to create a new job', function () {

		});

		it('should have an action to view people on the server', function () {

		});

		it('should have an action to view server build history', function () {

		});

		it('should change the $location path according to the action selected', function () {

		});

		it('should have actions with title, tooltip text, describing icon and actual action location path', function () {
			
		})

	});

	describe('MainPageCtrl', function () {
		var pageCtrl;
		var scope;
		var location;

		beforeEach(inject(function ($rootScope, $controller, $location){
			scope = $rootScope.$new();
			location = $location;
			pageCtrl = $controller('MainPageCtrl', {$scope: scope, $location: location});
		}));

		it('should have a title corresponding to the route', function () {

		});

		it('should have a navigation hierarchy for breadcrumb', function () {

		});

		it('should redirect to specific point of breadcrumb', function () {

		});

	});

});