'use strict';

/* Services */

jenkinsClient.value('version', '0.0.2');

jenkinsClient.factory('View', ['$resource', function ($resource){
	return $resource('/api/json', {tree: 'views[name,jobs[name,color,healthReport[description,score]]]'}, {
		query: {method: 'GET', params: {}, isArray: false}
	});
}
]);