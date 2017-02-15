angular.module('your_app_name.getting-started.controllers', [])

.controller('GettingStartedCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
//	$scope.skipIntro = function(){
//		$state.go('main.app.map');
//	}

//	$scope.show_call_to_action_button = false;
        $scope.show_call_to_action_button = true;
//	$scope.show_skip_button = false;
        $scope.show_skip_button = true;

	var slides = $ionicSlideBoxDelegate.$getByHandle('getting-started-slides');

	$scope.pagerClicked = function(index){
		slides.slide(index);
	};

	$scope.slideChanged = function($index){
		if(($index+1) === slides.slidesCount())
		{
			// We are in the last slide, show "Sign Up" call to action button
//			$scope.show_call_to_action_button = true;
			slides.update();
		}
		else
		{
//			$scope.show_call_to_action_button = false;
		}

		// Show skip on every slide except the firts one
		if(($index+1) > 1)
		{
			$scope.show_skip_button = true;
		}
		else
		{
			$scope.show_skip_button = false;
		}
	};

	// Getting started questions
	$scope.browsing = 'Plus Size';

	$scope.pick_categories = {};
	$scope.pick_categories.tops = true;
	$scope.pick_categories.jackets = true;

})


;
