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
		var $httpBackend;

		beforeEach(inject(function ($rootScope, $controller, $injector){
			scope = $rootScope.$new();
			location = $injector.get('$location');
			$httpBackend = $injector.get('$httpBackend');
			pageCtrl = $controller('MainPageCtrl', {$scope: scope, $location: location});
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should have Dashboard title if the location is in root', function () {
			location.path('index.html');
			$httpBackend.when('GET', 'views/dashboard.html').respond('');
			scope.$apply();
			$httpBackend.flush();
			expect(scope.title).toBe('Dashboard');
		});

		it('should have view\'s title if the location is a view', function () {
			location.path('/view/All');
			$httpBackend.when('GET', 'views/jobviews.html').respond('');
			scope.$apply();
			$httpBackend.flush();
			expect(scope.title).toBe('View: All');
		});

		it('should have job\'s title if the location is a job', function () {

		});

		it('should have a navigation hierarchy for breadcrumb', function () {

		});

		it('should redirect to specific point of breadcrumb', function () {

		});

	});

	describe('JobViewCtrl', function () {
		var viewCtrl;
		var $scope;
		var $routeParams;
		var view;
		var $httpBackend;
		var $controller;
		var fakeResponse = {views: [{name: 'All', jobs: [{name: 'TestJob'},{name: 'TestJob2'}]},{name: 'FirstView', jobs: []}]};
		beforeEach(inject(function ($injector){
			$scope = $injector.get('$rootScope').$new();
			$routeParams = $injector.get('$routeParams');
			view = $injector.get('View');
			$httpBackend = $injector.get('$httpBackend');
			$controller = $injector.get('$controller');
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should fetch all views if no specific view is specified', function () {
			$httpBackend.when('GET', '/api/json?tree=views%5Bname,jobs%5Bname%5D%5D').respond(fakeResponse);
			viewCtrl = $controller('JobViewCtrl', {$scope: $scope, $routeParams: $routeParams, View: view});
			$httpBackend.flush();
			expect($scope.views.views.length).toBe(2);
		});

		it('should have just currentView if a view was specified in routeParams', function () {
			$httpBackend.when('GET', '/api/json?tree=views%5Bname,jobs%5Bname%5D%5D').respond(fakeResponse);
			$routeParams = {jobViewName: 'FirstView'};
			viewCtrl = $controller('JobViewCtrl', {$scope: $scope, $routeParams: $routeParams, View: view});
			$httpBackend.flush();
			expect(angular.isDefined($scope.currentView)).toBeTruthy();
			expect($scope.currentView.name).toBe('FirstView');
		});

	});
});