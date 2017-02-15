angular.module('your_app_name.filters.controllers', [])

        .controller('FiltersCtrl', function ($scope, $state, $ionicUser, $rootScope, $ionicSlideBoxDelegate) {

//	$scope.category_filter = 'Food';
            $scope.distance_filter = $ionicUser.get('distance_filter', 30); // get value of 'invites_remaining' or 5
            $scope.price_filter = $ionicUser.get('price_filter', {from:1, to:30});
            $scope.ingredients_filter = $ionicUser.get('ingredients_filter', {meat:true, halal:true});

            $scope.tags_filter = {};
            $scope.tags_filter.vegetables = true;
            $scope.tags_filter.spicy = true;

//	$scope.color_filter = '#c284e5';

//	$scope.size_filter = 'M';

//            $scope.ingredients_filter = {};
            $scope.ingredients_filter.meat = true;
            $scope.ingredients_filter.halal = true;
            

//            $scope.show_filter = 'All';

//	$scope.budget_filter = '$';

            

//            $scope.price_filter = {
//                from: 1,
//                to: 30
//            };
            $scope.price_filter_range = {
                min: 1,
                max: 100
            };
            $scope.$on('save-pref', function (event, args) {
                $ionicUser.set('distance_filter', $scope.distance_filter);
                $scope.price_filter.from = angular.element(document.querySelector("#price_from")).val();
                $scope.price_filter.to = angular.element(document.querySelector("#price_to")).val();                 
                $ionicUser.set('price_filter', $scope.price_filter);
                $ionicUser.set('tags_filter', $scope.tags_filter);
                $ionicUser.set('ingredients_filter', $scope.ingredients_filter);
                $ionicUser.save();
            });

            $scope.$watch('price_filter', function () {
                $ionicUser.set('price_filter', $scope.price_filter);
//        alert('hey, myVar has changed!');
            });

//            $scope.savePref = function () {
//                $ionicUser.set('distance_filter', $scope.distance_filter);
//                $ionicUser.set('price_filter', $scope.price_filter);
//                $ionicUser.set('tags_filter', $scope.tags_filter);
//                $ionicUser.save();
//            };

            $scope.cancelRefine = function () {
                var previous_view = _.last($rootScope.previousView);
                $state.go(previous_view.fromState, previous_view.fromParams);
            };

            $scope.applyRefine = function () {
//                $scope.savePref();
                $rootScope.$broadcast('save-pref');
                var previous_view = _.last($rootScope.previousView);
                $state.go(previous_view.fromState, previous_view.fromParams);
            };

            $scope.lockSlide = function () {
                $ionicSlideBoxDelegate.$getByHandle('filter-tabs-slider').enableSlide(false);
            };
        })

        ;
