angular.module('your_app_name.getting-started.directives', [])

.directive('customCheckbox', function($ionicConfig) {
  return {
    restrict: 'E',
		scope: {
			title: '@',
			model: '=ngModel'
		},
    replace: true,
    transclude: true,
    templateUrl: 'views/getting-started/custom-checkbox.template.html',
    compile: function(element, attr) {
      var checkboxWrapper = element[0].querySelector('.checkbox');
      checkboxWrapper.classList.add('checkbox-' + $ionicConfig.form.checkbox());
    }
  };
})


;
