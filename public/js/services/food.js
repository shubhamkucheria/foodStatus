angular.module('shubhamDalvirooService', [])

	// simple service
	// each function returns a promise object
	.factory('Food', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/food');
			},
			create : function(foodData) {
				return $http.post('/api/food', foodData);
			},
			delete : function(id) {
				return $http.delete('/api/food/' + id);
			},
			update : function(foodData) {
				return $http.post('/api/updateFood', foodData);
			}
		}
	}]);