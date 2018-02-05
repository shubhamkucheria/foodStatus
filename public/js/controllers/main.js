angular.module('shubhamDalvirooController', [])

	.controller('mainController', ['$scope','$http','Food', function($scope, $http, Food) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.editFunction = false;

		// GET =====================================================================
		// when landing on the page, get all food and show them
		// use the service to get all the food
		Food.get()
			.success(function(data) {
				$scope.food = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the data to the node API
		$scope.ReportGen = function() {
			var arr = [];
			arr.push('','Dish name', 'Produced', 'Predicted\n');
			$scope.food.map(function(item) {
				arr.push(item.text, item.createdTillNow, item.predicted+'\n');
			});
			// arr.push(JSON.stringify($scope.food));
			console.log('clicked');
			download(arr, "filename.csv", "text/csv");

		}
		function download(content, filename, contentType)
		{
		    if(!contentType) contentType = 'application/octet-stream';
		        var a = document.createElement('a');
		        var blob = new Blob([content], {'type':contentType});
		        a.href = window.URL.createObjectURL(blob);
		        a.download = filename;
		        a.click();
		}

		$scope.createFood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Food.create($scope.formData)

					// if successful creation, call our get function to get all the new food
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.food = data; // assign our new list of food
					});
			}
		};


		$scope.edit = function(data) {
			$scope.editFunction = true;
			$scope.formData =  data; // assign again existing food data which have to edit
		};

		$scope.update = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			// $scope.formData =  data;
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Food.update($scope.formData)

					// if successful update, call our get function to get all the new food
					.success(function(data) {
						$scope.loading = false;
						$scope.editFunction = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.food = data; // assign our new list of food
					});
			}
		};

		// DELETE ==================================================================
		// delete a food after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Food.delete(id)
				// if successful deletion, call our get function to get all the new food
				.success(function(data) {
					$scope.loading = false;
					$scope.food = data; // assign our new list of food
				});
		};
	}]);