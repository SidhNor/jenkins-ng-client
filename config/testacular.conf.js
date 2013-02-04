basePath = '../';

files = [
	JASMINE,
	JASMINE_ADAPTER,
	'test/lib/jquery-1.9.0.min.js',
	'app/lib/angular/angular.js',
	'app/lib/angular/angular-*.js',
	'app/lib/angular-ui/*.js',
	'test/lib/angular/angular-mocks.js',
	'app/js/app.js',
	'app/js/**/*.js',
	'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
	outputFile: 'test_out/unit.xml',
	suite: 'unit'
};
