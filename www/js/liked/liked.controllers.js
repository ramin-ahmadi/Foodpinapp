angular.module('your_app_name.liked.controllers', [])

.controller('LikedCtrl', function($scope, lists) {
	$scope.lists = lists;
})

.controller('ListDetailsCtrl', function($scope, $state, $rootScope, list) {
	$scope.goBack = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
  };

	$scope.list = list;
})

.controller('NewListCtrl', function($scope, $state, $rootScope) {
	$scope.cancel = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
  };

	$scope.create = function() {
		var previous_view = _.last($rootScope.previousView);
		$state.go(previous_view.fromState, previous_view.fromParams );
  };
})


;
