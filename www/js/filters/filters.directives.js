angular.module('your_app_name.filters.directives', [])

.directive('filterTabs', function($ionicSlideBoxDelegate) {
	return {
		restrict: 'A',
		scope: {
			slider: '@'
		},
		controller: function($scope) {
			var tabs = $scope.tabs = [],
					utils = this;

			this.select = function(tab) {
        angular.forEach(tabs, function(tab) {
          tab.selected = false;
        });
        tab.selected = true;
				$ionicSlideBoxDelegate.$getByHandle($scope.slider).slide(tab.index - 1);
      };

			this.addTab = function(tab) {
        if (tabs.length === 0) {
          utils.select(tab);
        }
        tabs.push(tab);
      };
		}
	};
})

.directive('filterTab', function() {
	return {
		restrict: 'E',
		require: '^filterTabs',
		templateUrl: 'views/filters/tab.template.html',
		transclude: true,
		replace: true,
		scope: {
			index: '@tab'
		},
		link: function(scope, element, attr, tabsCtrl) {
			tabsCtrl.addTab(scope);

			element.on("click", function(event){
				tabsCtrl.select(scope);
			});
		}
	};
})

.directive('tagCheckbox', function($ionicConfig) {
  return {
    restrict: 'E',
		scope: {
			title: '@',
			model: '=ngModel'
		},
    replace: true,
    transclude: true,
    templateUrl: 'views/filters/tag-checkbox.template.html',
    compile: function(element, attr) {
      var checkboxWrapper = element[0].querySelector('.checkbox');
      checkboxWrapper.classList.add('checkbox-' + $ionicConfig.form.checkbox());
    }
  };
})

.directive('tagRadio', function() {
  return {
    restrict: 'E',
    replace: true,
		scope: {
			model: '=ngModel',
			value: '=ngValue',
			name: '@name'
		},
    transclude: true,
		templateUrl: 'views/filters/tag-radio.template.html',
    compile: function(element, attr) {
      return function(scope, element, attr) {
        scope.getValue = function() {
          return scope.ngValue || attr.value;
        };
      };
    }
  };
})

.directive('colorRadio', function() {
  return {
    restrict: 'E',
    replace: true,
		scope: {
			model: '=ngModel',
			value: '=ngValue',
			name: '@name'
		},
    transclude: true,
		templateUrl: 'views/filters/color-radio.template.html',
    compile: function(element, attr) {
      return function(scope, element, attr) {
        scope.getValue = function() {
          return scope.ngValue || attr.value;
        };
      };
    }
  };
})

.directive('numberInput', function() {
  return {
    restrict: 'E',
    replace: true,
		scope: {
			model: '=ngModel'
		},
    transclude: true,
		templateUrl: 'views/filters/number-input.template.html',
    controller: function($scope) {
			$scope.minusOne = function(){
				if($scope.model>1)
				{
					$scope.model = $scope.model -1;
				}
			}

			$scope.plusOne = function(){
				$scope.model = $scope.model +1;
			}
    }
  };
})

;
