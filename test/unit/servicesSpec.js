'use strict';

/* jasmine specs for services go here */

describe('service', function () {
	beforeEach(module('jenkinsClient'));

	describe('version', function () {
		it('should return current version', inject(function (version) {
			expect(version).toEqual('0.0.2');
		}));
	});

	describe('View resource', function () {
		var $httpBackend;
		var View;
		var fakeResponse = {views: [{name: 'All', jobs: [{name: 'TestJob'},{name: 'TestJob2'}]},{name: 'FirstView', jobs: []}]};

		beforeEach(inject(function ($injector) {
			$httpBackend = $injector.get('$httpBackend');
			View = $injector.get('View');
			// backend definition common for all tests
			$httpBackend.when('GET', '/api/json?tree=views%5Bname,jobs%5Bname,color,healthReport%5Bdescription,score%5D%5D%5D').respond(fakeResponse);
		}));

		afterEach(function() {
			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
		});

		it('should fetch correctly the requests', function () {
			$httpBackend.expectGET('/api/json?tree=views%5Bname,jobs%5Bname,color,healthReport%5Bdescription,score%5D%5D%5D');
			var views = View.query();
			$httpBackend.flush();
			expect(angular.equals(views, fakeResponse)).toBeTruthy();
			expect(angular.isDefined(views.views)).toBeTruthy();
		});

		it('should not be an array', function () {
			$httpBackend.expectGET('/api/json?tree=views%5Bname,jobs%5Bname,color,healthReport%5Bdescription,score%5D%5D%5D');
			var views = View.query();
			$httpBackend.flush();
			expect(angular.isArray(views)).not.toBeTruthy();
		});

		it('should have correct data', function () {
			$httpBackend.expectGET('/api/json?tree=views%5Bname,jobs%5Bname,color,healthReport%5Bdescription,score%5D%5D%5D');
			var views = View.query();
			$httpBackend.flush();
			expect(views.views[0].jobs.length).toBe(2);
			expect(views.views[1].jobs.length).toBe(0);
			expect(views.views[0].jobs[0].name).toBe('TestJob');
		});

	});
});
