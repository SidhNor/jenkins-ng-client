'use strict';

/* jasmine specs for controllers go here */
describe('Controllers', function() {
  describe('MenuCtrl', function(){
    var menuCtrl;
    var scope;

    beforeEach(inject(function ($rootScope, $controller){
      scope = $rootScope.$new();
      menuCtrl = $controller(MenuCtrl, {$scope: scope});
    }));

    it('should have menu links', function() {
      expect(angular.isDefined(scope.links)).toBeTruthy()
    });

    it('should have menu links with src', function() {
      for(var i in scope.links) {
        expect(angular.isDefined(scope.links[i].src)).toBeTruthy();
        expect(angular.isString(scope.links[i].src)).toBeTruthy();
      }
    });

    it('should have menu links with label', function() {
      for(var i in scope.links) {
        expect(angular.isDefined(scope.links[i].label)).toBeTruthy();
        expect(angular.isString(scope.links[i].label)).toBeTruthy();
      }
    });

    it('should have menu links with iconClass', function() {
      for(var i in scope.links) {
        expect(angular.isDefined(scope.links[i].iconClass)).toBeTruthy(); 
        expect(angular.isString(scope.links[i].iconClass)).toBeTruthy();
      }
    });

  })
});