angular.module('your_app_name.feed.controllers', [])

        .controller('FeedCtrl', function ($scope, $ionicScrollDelegate) {
//            $scope.getProductsInCart = function () {
//                return ShoppingCartService.getProducts().length;
//            };
        })

        .controller('FashionCtrl', function ($scope, $stateParams, products) {
            $scope.filters = $stateParams.filters;

            $scope.products = products;
        })

        .controller('FoodCtrl', function ($scope, products) {
            $scope.products = products;
        })

        .controller('MapCtrl', function ($scope, products, NgMap, FoodService) {
            $scope.products = products;
            $scope.product = products[0];
            $scope.centerlat = products[0].lat;
            $scope.centerlng = products[0].lng;
//            $scope.$on('mapInitialized', function (event, map) {
//                // If we want to access the map in the future
//                $scope.map = map;
//            });


            NgMap.getMap().then(function (map) {
                $scope.map = map;
            });

            $scope.showDetail = function (event, info) {
                $scope.product = info;
                $scope.map.showInfoWindow('foo-iw', this);
            };


//            $scope.showInfo = function(evt, prodId){
//                $scope.info = $scope.products[prodId];
//                $scope.map.showInfoWindow('info', this);
//                alert('This product selected: ' + prodId);
//            };

//            $scope.viewProduct = function(prodId){
//                alert('This product selected: ' + prodId);
//            };

        })

        ;
