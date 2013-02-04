'use strict';

describe('LoginCtrl', function () {

	var $scope;
	var $http;
	var dialog;
	var $httpBackend;
	var $controller;
	var loginCtrl;
	var fakeResponse = {};
	var eventReceived;

	beforeEach(inject(function ($injector){
		$scope = $injector.get('$rootScope').$new();
		$httpBackend = $injector.get('$httpBackend');
		$http = $injector.get('$http');
		$controller = $injector.get('$controller');
		eventReceived = false;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('should post the data from scope to the server when login is pressed', function () {
		$httpBackend.when('POST', '/j_acegi_security_check').respond(fakeResponse);
		loginCtrl = $controller('LoginCtrl', {$scope: $scope, dialog: {close:function(){}}, $http: $http});
		$scope.submit({});		
		$httpBackend.flush();
	});

	it('should broadcast successfull event if server accepts credentials', function () {
		$httpBackend.when('POST', '/j_acegi_security_check').respond(200, fakeResponse);
		loginCtrl = $controller('LoginCtrl', {$scope: $scope, dialog: {close:function(){}}, $http: $http});
		$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_CONFIRMED, function(){
			eventReceived = true;
		});
		$scope.submit({});		
		$httpBackend.flush();
		expect(eventReceived).toBeTruthy();
	});

	it('should broadcast failure event if server rejects credentials 401 response', function () {
		$httpBackend.when('POST', '/j_acegi_security_check').respond(401, fakeResponse);
		loginCtrl = $controller('LoginCtrl', {$scope: $scope, dialog: {close:function(){}}, $http: $http});
		$scope.$on(jenkinsClient.eventNames.AUTH_LOGIN_REJECTED, function(){
			eventReceived = true;
		});
		$scope.submit({});		
		$httpBackend.flush();
		expect(eventReceived).toBeTruthy();
	});

	it('should set an error if server rejects credentials', function () {

	});

});