'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

	beforeEach(function() {
		browser().navigateTo('../../app/index.html');
	});


	it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
		expect(browser().location().url()).toBe("/view1");
	});


	describe('view1', function() {

		beforeEach(function() {
			browser().navigateTo('#/view1');
		});


		it('should render view1 when user navigates to /view1', function() {
			expect(element('[ng-view] p:first').text()).
				toMatch(/partial for view 1/);
		});

	});

	describe('Menu', function (){

		it('should be disabled when the user is on the home page', function () {

		});

		it('should be enabled when the user is job view page', function () {

		});		

	});

	describe('Login View', function (){
		
	});

});
