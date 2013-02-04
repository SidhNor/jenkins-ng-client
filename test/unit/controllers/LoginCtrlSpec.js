'use strict';

describe('LoginCtrl', function () {

	var $scope;
	var $http;
	var dialog;
	var $httpBackend;
	var $controller;
	var loginCtrl;
	var fakeResponse = {};

	beforeEach(inject(function ($injector){
		$scope = $injector.get('$rootScope').$new();
		$httpBackend = $injector.get('$httpBackend');
		$http = $injector.get('$http');
		$controller = $injector.get('$controller');
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should not post anything if data is not valid',function () {
		loginCtrl = $controller('LoginCtrl', {$scope: $scope, dialog: {close:function(){}}, $http: $http});
		//Username only
		$scope.submit({j_username: 'test'});	
		//Password only
		$scope.submit({j_password: 'test'});
	});
	
	it('should post the data from scope to the server when login is pressed', function () {
		$httpBackend.when('POST', '/j_acegi_security_check').respond(fakeResponse);
		loginCtrl = $controller('LoginCtrl', {$scope: $scope, dialog: {close:function(){}}, $http: $http});
		$scope.submit({});		
		$httpBackend.flush();
	});

	it('should broadcast successfull event if server accepts credentials', function () {

	});

	it('should broadcast failure event if server rejects credentials', function () {

	});

	it('should set an error if server rejects credentials', function () {

	});

});