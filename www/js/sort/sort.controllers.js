angular.module('your_app_name.sort.controllers', [])

.controller('SortCtrl', function($scope, $ionicPopup, $state, $filter) {
	var sortPopup = {},
			current_state = $filter('cleanStateClass')($state.current.name);

	$scope.sort_order = 'Price';

	$scope.openSort = function(){
		sortPopup = $ionicPopup.show({
			cssClass: 'popup-outer sort-view '+current_state,
			templateUrl: 'views/sort/sort.html',
			scope: angular.extend($scope, {sort_order: $scope.sort_order}),
			title: 'Sort by:',
			buttons: [
				{ text: 'Close', type: 'close-popup' }
			]
		});
	};

  //CLICK IN USER NAME
  // $scope.navigateToUserProfile = function(user){
  //   sortPopup.close();
  //   // $state.go('app.profile.posts', {userId: user.id});
  // };
})

;
