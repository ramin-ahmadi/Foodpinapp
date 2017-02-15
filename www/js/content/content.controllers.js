angular.module('your_app_name.content.controllers', [])

        .controller('FoodContentCtrl', function ($scope, $state, $rootScope, $ionicPopup, product, ReviewService) {
            $scope.goBack = function () {
                var previous_view = _.last($rootScope.previousView);
                if (previous_view.fromState == "main.app.map")
                {
                    $state.go(previous_view.fromState);
                } else
                {
                    $state.go(previous_view.fromState, previous_view.fromParams);
                }
            };

            $scope.product = product;
            $scope.reviews = [];
            $scope.maxreviews = 3;

            $scope.product.selected_schedule = {
                name: "Today 12:00 pm to 12:00 am"
            };

//	$scope.product.addresses = [
//		{
//			street: "0 Waubesa Junction",
//			city: "Houston",
//			state: "TX",
//			postal_code: "77020",
//			phone: "1-(713)471-0205",
//			lat: 43.07493,
//			lng: -89.381388
//		},
//		{
//			street: "50 Northfield Way",
//			city: "Brooklyn",
//			state: "NY",
//			postal_code: "11210",
//			phone: "1-(347)846-3569",
//			lat: 43.07493,
//			lng: -88.381388
//		}
//	];

            $scope.product.selected_address = product.branch;

            $scope.newReview = function (address) {
                $state.go('main.app.reviews', {mdid: $scope.product.id});
            };

            $scope.selectAddress = function (address) {
                $scope.product.selected_address = address;
                addressPopup.close();
            };

            var schedulesPopup = {},
                    addressPopup = {};

            $scope.openSchedules = function () {
                schedulesPopup = $ionicPopup.show({
                    cssClass: 'popup-outer food-schedules-view',
                    templateUrl: 'views/content/food/schedules.html',
                    scope: angular.extend($scope, {}),
                    title: 'More info',
                    buttons: [
                        {text: 'Close', type: 'close-popup'}
                    ]
                });
            };

            $scope.openAddresses = function () {
                addressPopup = $ionicPopup.show({
                    cssClass: 'popup-outer food-addresses-view',
                    templateUrl: 'views/content/food/addresses.html',
                    scope: angular.extend($scope, {addresses: $scope.product.addresses, selected_address: $scope.product.selected_address}),
                    title: 'Addresses',
                    buttons: [
                        {text: 'Close', type: 'close-popup'}
                    ]
                });
            };

            $scope.$on('mapInitialized', function (event, map) {
                // If we want to access the map in the future
                $scope.map = map;
            });

            ReviewService.getReviews($scope.product.id).then(function (data) {
                $scope.reviews = data.data;
                console.log($scope.reviews[0]);
            }, function (error) {
                console.log(error);
//                    $ionicLoading.show({template: 'Unable to load reviews...', duration: 500});
            });
            
            $scope.showAllReviews = function () {
                $scope.maxreviews = $scope.reviews.length;
            };
        }) ;
