angular.module('your_app_name.feed.directives', [])

.directive('slidingList', function($ionicScrollDelegate, $rootScope, $state) {
	return {
		restrict: 'E',
		transclude: true,
		scope: {},
		controller: function($scope, $element, $attrs) {
			var items = $scope.items = [],
					active_class = $scope.active_class = "",
					utils = this;

			// $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			var stateChangeListener = $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
				console.log("state changed", toState);
				console.log("active_class", $scope.active_class);

				// debugger;
				// var $fromState = $state.get(fromState.name),
				// 		$toState = $state.get(toState.name);
				// if(!$fromState.includes('main.app.feed') && $toState.includes('main.app.feed'))
				console.log("from ["+fromState.name+"] indexOf", fromState.name.indexOf('main.app.feed'));
				console.log("to ["+toState.name+"] indexOf", toState.name.indexOf('main.app.feed'));
				if(fromState.name.indexOf('main.app.feed')==-1 && toState.name.indexOf('main.app.feed')>=0)
				{
					// Estoy navegando de otra tab hacia la tab de feed
					console.log("**** Estoy navegando de otra tab hacia la tab de feed");
					// console.log("active_class", active_class);
					// console.log("items", items);
					var selected_item = utils.getSelectedItem(),
							previous_item = utils.getItem(toState.name);

					console.log("selected_item", selected_item);
					console.log("previous_item", previous_item);

					if(selected_item.state != previous_item.state)
					{
						$scope.$broadcast("item-selected", previous_item);
						console.log("ANIMATING SCROLL");
					}
					else
					{
						// Then, we should not re animate the sliding tabs
						console.log("DONT ANIMATE SCROLL");
					}
				}
			});

			$scope.$on('$destroy', function() {
			  // Do cleanup work
				console.log("destroing feed directives scope, should clean up");
				stateChangeListener();
			});

			this.selectItem = function(item){
				angular.forEach(items, function(item) {
					item.selected = false;
				});
				item.selected = true;
				$scope.active_class = item.state;
				console.log("item selected", item.state);
			};

			$scope.$on("item-selected", function(event, item){
				utils.selectItem(item);

				var scroll = $element[0].querySelector('.scroll');
				console.log("scrolling, ITEM => ", item);
				// debugger;
				var vw = scroll.clientWidth,
						scroll_to = (item.position.left - ((vw/2) - (item.position.width/2)));
				$ionicScrollDelegate.$getByHandle('sliding-list-scroll').scrollTo(scroll_to, 0, true);
				// $ionicScrollDelegate.$getByHandle('feeds-content').resize();
				// document.getElementsByClassName('category-feed')[0].style.webkitTransform = 'scale(1)';
				// var t = document.createTextNode(' ');
			  // document.body.appendChild(t);
			  // setTimeout(function() { t.parentNode.removeChild(t); }, 0);

				console.log("fixing safari lazy repaint bug");
				// Hack to prevent white screen on safari ios caused by safari lazy repaint bug
				$element[0].style.display='none';
				$element[0].offsetHeight; // no need to store this anywhere, the reference is enough
				$element[0].style.display='block';
				// document.getElementsByClassName('category-feed')[0].style.display='none';
				// document.getElementsByClassName('category-feed')[0].offsetHeight; // no need to store this anywhere, the reference is enough
				// document.getElementsByClassName('category-feed')[0].style.display='block';
			});

			this.addItem = function(item) {
				if (items.length === 0) {
					// console.log("FIRST ITEM, SHULD SELECT?", item);
					// utils.selectItem(item);
					console.log("The state is: ", $state.current.name);
				}
				item.index = items.length || 0;
				items.push(item);
				// Check if item is current state
				if($state.current.name == item.state)
				{
					console.log("The item is the same as the state. ITEM => ", item);
					// utils.selectItem(item);
					$scope.$broadcast("item-selected", item);
				}
			};

			this.getItem = function(item_state){
				var selected_item = {};
				angular.forEach(items, function(item) {
					if(item.state == item_state)
					{
						selected_item = item;
					}
				});
				return selected_item;
			};

			this.getSelectedItem = function(){
				var selected_item = {};
				angular.forEach(items, function(item) {
					if(item.selected)
					{
						selected_item = item;
					}
				});
				return selected_item;
			};
		},
		link: function(scope, element, attr, slidingListCtrl) {
			// We moved this to the controller
			// var scroll = element[0].querySelector('.scroll');
			//
			// scope.$on("item-selected", function(event, item){
			// 	console.log("scrolling, ITEM => ", item);
			// 	var vw = scroll.clientWidth,
			// 			scroll_to = (item.position.left - ((vw/2) - (item.position.width/2)));
			// 	$ionicScrollDelegate.$getByHandle('sliding-list-scroll').scrollTo(scroll_to, 0, true);
			// });
		},
		templateUrl: 'views/feed/templates/sliding-list.html'
	};
})

.directive('centerEdges', function(){
	return {
		priority: 100,
		scope: {},
		link: function(scope, element, attr){
			var list_items = element.children(),
					list_items_count = list_items.length,
					first_child = list_items[0],
					last_child = list_items[list_items_count-1],
					before = angular.element('<li/>'),
					after = angular.element('<li/>');

			before.css('width', 'calc(50vw - '+(first_child.clientWidth/2)+'px)');
			after.css('width', 'calc(50vw - '+(last_child.clientWidth/2)+'px)');
			element.prepend(before);
			element.append(after);
		},
		restrict: 'A'
	};
})

.directive('slidingItem', function($ionicPosition, $timeout) {
	return {
		restrict: 'E',
		require: '^slidingList',
		transclude: true,
		replace: true,
		scope: {
			state: '@'
		},
		controller: function($scope, $element, $attrs) {
			// Store position at the begining
			// var list_item = $element,
			// 		item_position = {};
			// $timeout(function(){
			// 	item_position = $ionicPosition.position(list_item);
			// 	$scope.position = item_position;
			// 	// console.log("["+$element[0].computedName+", "+$scope.state+"] My position is: ", item_position);
			// }, 0);

			$scope.select = function(item){
				$scope.$emit("item-selected", item);
			};
		},
		link: function(scope, element, attr, slidingListCtrl) {
			// Get position and add the item to the parent's controller
			var list_item = element,
					item_position = {};
			$timeout(function(){
				item_position = $ionicPosition.position(list_item);
				scope.position = item_position;
				// console.log("["+$element[0].computedName+", "+$scope.state+"] My position is: ", item_position);
				slidingListCtrl.addItem(scope);
			}, 0);

			// slidingListCtrl.addItem(scope);
		},
		templateUrl: 'views/feed/templates/sliding-item.html'
	};
})



;
