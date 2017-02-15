angular.module('your_app_name.map.directives', [])

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

;
