'use strict';

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