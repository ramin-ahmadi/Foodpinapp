angular.module('your_app_name.map.controllers', [])

        .controller('MapCtrl', function ($scope, $rootScope, products, NgMap, $state, FoodService) {
            $scope.products = products;
            $scope.product = products[0];
            $scope.centerlat = products[0].lat;
            $scope.centerlng = products[0].lng;

            NgMap.getMap().then(function (map) {
                $rootScope.map = map;
//                google.maps.event.trigger($rootScope.map, 'resize');
            });

            $scope.showDetail = function (event, info) {
                $scope.product = info;
                $rootScope.map.showInfoWindow('detail-iw', this);
            };

            $scope.hideDetail = function () {
                $rootScope.map.hideInfoWindow('detail-iw', this);
            };

            $scope.gotoDish = function () {
                //Code to save the hit count
                FoodService.hitcount($scope.product.id).then(function () {
//                    $ionicLoading.show({template: 'Review saved successfuly...', duration: 500});
                    console.log("Success");
                }, function (error) {
//                    $ionicPopup.alert({
//                        title: 'Failed',
//                        template: error
//                    });
                    console.log("Error: " + error);
                });
                $state.go('main.app.feed.food.content', {productId: $scope.product.id});
            };

//            $scope.mycallback = function (map) {
//                $scope.map = map;
//                $scope.$apply();
//                google.maps.event.trigger($scope.map, 'resize');
//                
//            };


//            $scope.showInfo = function(evt, prodId){
//                $scope.info = $scope.products[prodId];
//                $scope.map.showInfoWindow('info', this);
//                alert('This product selected: ' + prodId);
//            };

//            $scope.viewProduct = function(prodId){
//                alert('This product selected: ' + prodId);
//            };

        });
