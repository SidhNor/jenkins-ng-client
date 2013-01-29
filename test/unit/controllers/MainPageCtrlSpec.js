'use strict';

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

	it('should have views title if the location is a view', function () {
		location.path('/view/All');
		$httpBackend.when('GET', 'views/jobviews.html').respond('');
		scope.$apply();
		$httpBackend.flush();
		expect(scope.title).toBe('View: All');
	});

	it('should have jobs title if the location is a job', function () {

	});

	it('should have a navigation hierarchy for breadcrumb', function () {

	});
});
